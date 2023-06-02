import { BaseMessageResponseDTO } from '@common/dtos/responses/base-message-response.dto';
import { ValidationException } from '@common/error.base';
import { ErrorCodeEnum } from '@common/error-code';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ValidationError } from 'class-validator';
import type { Response } from 'express';
import _ from 'lodash';

@Catch(ValidationException)
export class ValidationExceptionFilter
  implements ExceptionFilter<ValidationException>
{
  private logger = new Logger(ValidationExceptionFilter.name);

  constructor(public reflector: Reflector) {}

  catch(exception: ValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const r = exception.getResponse() as { message: ValidationError[] };

    const validationErrors = r.message;
    const resDto = this.validationFilter(validationErrors);
    this.logger.error(
      `${exception.name}: ${validationErrors}`,
      '',
      ValidationExceptionFilter.name,
      '',
    );
    response.status(statusCode).json(resDto);
  }

  private validationFilter(
    validationErrors: ValidationError[],
  ): BaseMessageResponseDTO {
    for (const validationError of validationErrors) {
      const children = validationError.children;

      if (children && !_.isEmpty(children)) {
        return this.validationFilter(children);
      }

      delete validationError.children;

      const constraints = validationError.constraints ?? {};

      const message = Object.entries(constraints)
        .map(([, value]) => value)
        .join('\n');

      return new BaseMessageResponseDTO(ErrorCodeEnum.BAD_REQUEST, message);
    }

    return new BaseMessageResponseDTO(
      ErrorCodeEnum.BAD_REQUEST,
      'validate fail',
    );
  }
}
