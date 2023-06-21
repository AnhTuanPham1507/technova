import { BaseService } from '@common/abstract.service';
import type { ClassConstructor } from 'class-transformer';

export class BaseMoMoService<T> extends BaseService {

  private responseType: ClassConstructor<T>;


  constructor(
    domain: string,
    endPoint: string,
    method: string,
    responseType: ClassConstructor<T>,
    body?: Record<string, any>,
    queryParameter?: Record<string, any>,
  ) {
    super(domain, endPoint, method, body, queryParameter);
    this.responseType = responseType;
  }

  getHeaders(): Record<string, any> {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(this.body))
    };
  }

  getResponseType(): ClassConstructor<T> {
    return this.responseType;
  }
}
