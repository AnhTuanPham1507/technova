import type { IBasicAuthData, IHttpService } from '@interfaces/IHttpService';
import type { AxiosError } from 'axios';
import type { ClassConstructor } from 'class-transformer';

const DEFAULT_TIME_OUT = 300_000;

export abstract class BaseService implements IHttpService {
  protected endPoint: string;

  protected body?: Record<string, any>;

  protected domain: string;

  protected method: string;

  protected queryParameter?: Record<string, any>;

  constructor(
    domain: string,
    endPoint: string,
    method: string,
    body?: Record<string, any>,
    queryParameter?: Record<string, any>,
  ) {
    this.domain = domain;
    this.endPoint = endPoint;
    this.body = body;
    this.method = method;
    this.queryParameter = queryParameter;
  }

  abstract getHeaders(): Record<string, string>;

  abstract getAuthType(): string;

  getResponseType(): ClassConstructor<any> {
    throw new Error('Method not implemented.');
  }

  getMethod(): string {
    return this.method;
  }

  getQueryParameter(): Record<string, any> | undefined {
    return this.queryParameter;
  }

  handleError?: (error: AxiosError<unknown, any>) => void;

  getEndpoint(): string {
    return this.endPoint;
  }

  getBody(): Record<string, any> | undefined {
    return this.body;
  }

  getAuthData(): undefined | string | IBasicAuthData {
    return undefined;
  }

  getDomain(): string {
    return this.domain;
  }

  getTimeout() {
    return DEFAULT_TIME_OUT;
  }
}
