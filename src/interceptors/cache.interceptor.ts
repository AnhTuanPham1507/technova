import { CacheDebugStatus } from '@constants/cache';
import type {
  CallHandler,
  ExecutionContext,
  HttpServer,
  NestInterceptor,
} from '@nestjs/common';
import {
  CACHE_KEY_METADATA,
  CACHE_MANAGER,
  CACHE_TTL_METADATA,
  Inject,
  Injectable,
  Optional,
} from '@nestjs/common';
import type { Response } from 'express';
import { isFunction, isNil } from 'lodash';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
const REFLECTOR = 'Reflector';
const CACHE_DEBUG_HEADER = 'x-cache-debug';

export interface IHttpAdapterHost<T extends HttpServer = any> {
  httpAdapter: T;
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  @Optional()
  @Inject(HTTP_ADAPTER_HOST)
  protected readonly httpAdapterHost?: IHttpAdapterHost;

  protected allowedMethods = ['GET'];

  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: any,
    @Inject(REFLECTOR) protected readonly reflector: any,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);

    if (!key) {
      return next.handle();
    }

    const ttlValueOrFactory =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) ?? null;

    const response = context.switchToHttp().getResponse<Response>();

    try {
      const value = await this.cacheManager.get(key);

      if (!isNil(value)) {
        return of(value).pipe(
          tap(() => {
            response.setHeader(CACHE_DEBUG_HEADER, CacheDebugStatus.HIT);
          }),
        );
      }

      const ttl = isFunction(ttlValueOrFactory)
        ? await ttlValueOrFactory(context)
        : ttlValueOrFactory;

      return next.handle().pipe(
        tap((payload) => {
          const args = isNil(ttl) ? [key, payload] : [key, payload, { ttl }];
          this.cacheManager.set(...args);
        }),
        tap(() => {
          response.setHeader(CACHE_DEBUG_HEADER, CacheDebugStatus.NONE);
        }),
      );
    } catch {
      return next.handle();
    }
  }

  protected trackBy(context: ExecutionContext): string | undefined {
    const httpAdapter = this.httpAdapterHost?.httpAdapter;
    const isHttpApp = httpAdapter && Boolean(httpAdapter.getRequestMethod);
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }

    if (!this.isRequestCacheable(context)) {
      return undefined;
    }

    const request = context.getArgByIndex(0);

    return httpAdapter.getRequestUrl(request);
  }

  protected isRequestCacheable(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    return this.allowedMethods.includes(req.method as string);
  }
}
