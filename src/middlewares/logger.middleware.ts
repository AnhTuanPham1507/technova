/* eslint-disable @typescript-eslint/unbound-method */
import { deepLog } from '@common/utils';
import type { NestMiddleware } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers, body } = req;

    let reqLog: any = {
      method,
      originalUrl,
      ip,
      contentType: headers['content-type'],
    };

    if (headers['content-type']?.includes('application/json')) {
      reqLog = {
        ...reqLog,
        body,
      };
    }

    this.logger.log(`Request: ${JSON.stringify(reqLog)}`);

    next();
  }

  logResponse(res: Response) {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;
    const chunkBuffers: any[] = [];

    res.write = (...chunks) => {
      const resArgs: Array<
        WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
      > = [];

      for (let i = 0; i < chunks.length; i++) {
        resArgs[i] = chunks[i];

        if (!resArgs[i]) {
          res.once('drain', res.write);
          i--;
        }
      }

      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }

      return rawResponse.apply(res, resArgs);
    };

    res.end = (...chunk) => {
      const resArgs: Array<
        WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>
      > = [];

      for (const [i, element] of chunk.entries()) {
        resArgs[i] = element;
      }

      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }

      const body = Buffer.concat(chunkBuffers).toString('utf8');

      const headersResponse = res.getHeaders();

      const bodyLog = headersResponse['content-type']
        ?.toString()
        .includes('application/json')
        ? JSON.parse(body)
        : 'Content is not JSON';

      const responseLog = {
        response: {
          statusCode: res.statusCode,
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'content-type': headersResponse['content-type'],
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'content-length': headersResponse['content-length'],
          },
          body: bodyLog || {},
        },
      };

      this.logger.log(`Response: ${deepLog(responseLog)}`);
      rawResponseEnd.apply(res, resArgs);

      const response = {
        response: {
          statusCode: res.statusCode,
          body: body || {},
          headers: res.getHeaders(),
        },
      };

      return response as unknown as Response;
    };
  }
}
