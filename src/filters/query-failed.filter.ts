import { BaseMessageResponseDTO } from '@common/dtos/responses/base-message-response.dto';
import { ErrorCodeEnum } from '@common/error-code';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter<QueryFailedError> {
  constructor(public reflector: Reflector) {}

  private logger = new Logger(QueryFailedFilter.name);

  catch(
    exception: QueryFailedError & { constraint?: string },
    host: ArgumentsHost,
  ) {
    this.logger.error(
      `${exception.name}: ${exception.message}`,
      '',
      QueryFailedFilter.name,
      '',
    );
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.constraint?.startsWith('UQ')
      ? HttpStatus.CONFLICT
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(status)
      .json(
        new BaseMessageResponseDTO(ErrorCodeEnum.QUERY_FAILED, 'Query fail'),
      );
  }
}
