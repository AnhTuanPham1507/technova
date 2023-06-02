import type { ErrorCodeEnum } from '@common/error-code';

export interface IError {
  error: string | undefined;
  errorCode?: ErrorCodeEnum;

  message: string;
}
