import type { AxiosError } from 'axios';
import type { ClassConstructor } from 'class-transformer';
export interface IBasicAuthData {
  username: string;
  password: string;
}

export interface IHttpService {
  getDomain(): string;
  getEndpoint(): string;
  getResponseType(): ClassConstructor<any>;
  getHeaders(): Record<string, string>;
  getMethod(): string;
  getQueryParameter(): Record<string, any> | undefined;
  getBody(): Record<string, any> | undefined;
  handleError?: (error: AxiosError) => void;
  getTimeout?: () => number | undefined;
}
