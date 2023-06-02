import { BadRequestException } from '@nestjs/common';
import type { IError } from 'interfaces/IError';

import type { ErrorCodeEnum } from './error-code';

export class BaseError extends Error implements IError {
  errorCode?: ErrorCodeEnum;

  error: string | undefined;

  stack?: string;

  constructor(msg: string, errorCode?: ErrorCodeEnum) {
    super(msg);
    this.errorCode = errorCode;
    this.message = msg;
  }
}

export class ValidationException extends BadRequestException {}

export class CoreErrorResponse {
  title: string;

  error_code?: string;

  status: number;

  traceId?: string;
}
