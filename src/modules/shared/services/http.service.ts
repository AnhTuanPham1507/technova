import { deepLog, getTransformResponseCallback } from '@common/utils';
import type { IHttpService } from '@interfaces/IHttpService';
import { HttpService as Axios } from '@nestjs/axios';
import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosError } from 'axios';
import { instanceToPlain } from 'class-transformer';
import FormData from 'form-data';
import { Agent } from 'https';
import moment from 'moment';
import type { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { Stream } from 'stream';

@Injectable()
export class HttpService {
  private httpsAgent = new Agent();

  private logger = new Logger(HttpService.name);

  constructor(private axios: Axios) {}

  private getHeaders(service: IHttpService) {
    return {
      headers: service.getHeaders()
    }
  }

  private getRequestConfig(service: IHttpService): AxiosRequestConfig {
    let queryParams: URLSearchParams | undefined;

    if (service.getQueryParameter()) {
      const queryRecord = instanceToPlain(service.getQueryParameter());

      this.logger.log(`Query params: ${JSON.stringify(queryRecord)}`);

      for (const k of Object.keys(queryRecord)) {
        if (queryRecord[k] === undefined) {
          delete queryRecord[k];
        }
      }

      queryParams = new URLSearchParams(queryRecord);
    }

    const responseType = service.getResponseType();

    return {
      httpsAgent: this.httpsAgent,
      ...this.getHeaders(service),
      transformResponse: getTransformResponseCallback(responseType),
      transformRequest: (data) => {
        if (data instanceof FormData) {
          return data;
        }

        if (typeof data === 'object') {
          const body = JSON.stringify(instanceToPlain(data));
          this.logger.log(`Body: ${body}`);

          return body;
        }

        this.logger.log(`Body: ${data}`);

        return data;
      },
      responseType:
        service.getResponseType().name === Stream.name ? 'stream' : 'json',
      params: queryParams,
      timeout: service.getTimeout ? service.getTimeout() : undefined,
    };
  }

  async call<R>(service: IHttpService): Promise<R> {
    this.logger.log(
      `Request - ${service.getMethod()} ${service.getEndpoint()}`,
    );

    const startTime = moment();

    let responseObs: Observable<AxiosResponse<R, any>>;
    const apiUrl = service.getDomain() + service.getEndpoint();

    switch (service.getMethod()) {
      case 'POST':
        responseObs = this.axios.post<R>(
          apiUrl,
          service.getBody(),
          this.getRequestConfig(service),
        );
        break;
      case 'DELETE':
        responseObs = this.axios.delete<R>(apiUrl, {
          ...this.getRequestConfig(service),
          data: service.getBody(),
        });
        break;
      case 'PUT':
        responseObs = this.axios.put<R>(
          apiUrl,
          service.getBody(),
          this.getRequestConfig(service),
        );
        break;
      case 'GET':
        responseObs = this.axios.get<R>(apiUrl, this.getRequestConfig(service));
        break;
      default:
        throw new Error('Method is not valid');
    }

    try {
      const response = await firstValueFrom(responseObs);
      const endTime = moment();
      const responseTime = endTime.diff(startTime, 'milliseconds');
      this.logger.log(
        `${
          response.status
        } - ${service.getMethod()} ${service.getEndpoint()} - ${
          response.headers.traceparent
        } - ${responseTime}ms`,
      );

      if (service.getResponseType().name !== Stream.name) {
        this.logger.log(`Response body: ${deepLog(response.data)}`);
      }

      return response.data;
    } catch (error) {
      const endTime = moment();
      const responseTime = endTime.diff(startTime, 'milliseconds');
      this.logger.error(
        `ResponseTime: ${responseTime}ms | ${error}`,
        HttpService.name,
      );

      if (error instanceof AxiosError) {
        if (service.handleError) {
          service.handleError(error);
        }

        this.logger.error(
          `${
            error.response?.status
          } - ${service.getMethod()} ${service.getEndpoint()} - ${
            error.response?.headers.traceparent
          }  - ${responseTime}ms`,
          HttpService.name,
        );
        this.logger.error(
          `Response body: ${deepLog(error.response?.data)}`,
          HttpService.name,
        );
        this.logger.error(
          `Response header: ${deepLog(error.response?.headers)}`,
          HttpService.name,
        );

        switch (error.response?.status) {
          case HttpStatus.BAD_REQUEST:
            throw new BadRequestException(error);
          case HttpStatus.NOT_FOUND:
            throw new NotFoundException(error);
          case HttpStatus.UNAUTHORIZED:
            throw new UnauthorizedException(error);
          case HttpStatus.FORBIDDEN:
            throw new ForbiddenException(error);
        }
      }

      throw new ServiceUnavailableException(error);
    }
  }
}
