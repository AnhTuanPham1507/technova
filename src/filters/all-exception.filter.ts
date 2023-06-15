import { BaseMessageResponseDTO } from '@common/dtos/responses/base-message-response.dto';
import { BaseError } from '@common/error.base';
import { ErrorCodeEnum } from '@common/error-code';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { Response } from 'express';

import type { IError } from '@/interfaces/IError';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log(exception)
    this.logger.error(
      `${exception.name}: ${exception.message}`,
      '',
      AllExceptionFilter.name,
      '',
    );

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const errorObj = exception.getResponse() as IError;
      const error = new BaseMessageResponseDTO(
        errorObj.error,
        errorObj.message,
      );
      response.status(statusCode).json(error);

      return;
    }

    if (exception instanceof BaseError) {
      const error = new BaseMessageResponseDTO(
        exception.errorCode,
        exception.message,
      );
      response.status(HttpStatus.BAD_REQUEST).json(error);

      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      new BaseMessageResponseDTO(
        ErrorCodeEnum.INTERNAL_SERVER_ERROR,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        exception.message,
      ),
    );
  }
}
