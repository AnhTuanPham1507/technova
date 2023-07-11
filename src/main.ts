import { ValidationException } from '@common/error.base';
import { AllExceptionFilter } from '@filters/all-exception.filter';
import { ValidationExceptionFilter } from '@filters/validation.filter';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { middleware as expressCtx } from 'express-ctx';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { LogProvider } from '@/providers/log.provider';

import { AppModule } from './app.module';
import { QueryFailedFilter } from './filters/query-failed.filter';
import { EnvConfigService } from './modules/shared/services/api-config.service';
import { SharedModule } from './modules/shared/shared.module';
import { setupSwagger } from './setup-swagger';
import { readFileSync } from 'fs';

export async function bootstrap(): Promise<NestExpressApplication> {
  const keyFile  = readFileSync(__dirname + '/ssl/star_technova.com.vn.key.pem');
  const certFile = readFileSync(__dirname + '/ssl/star_technova.com.vn.crt.pem');
  
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {
      ...new ExpressAdapter(),
       httpsOptions: {
        key: keyFile,
        cert: certFile,
      }
    }   
  );
  const configService = app.select(SharedModule).get(EnvConfigService);
  app.useLogger(LogProvider.getLoggerService());
  app.use(helmet());

  const whitelist = configService.appConfig.corsOrigins;
  app.enableCors({
    origin: whitelist,
    credentials: true,
    methods: '*',
    allowedHeaders: '*, Authorization',
  });
  app.enable('trust proxy');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: false }));

  app.use(cookieParser());

  app.use(
    rateLimit({
      windowMs: configService.rateLimitConfig.ttl,
      max: configService.rateLimitConfig.max,
    }),
  );

  app.use(compression());

  const morganFormat =
    ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
  app.use(
    morgan(morganFormat, {
      stream: {
        write(str: string) {
          Logger.log(str.slice(0, -1), 'Application');
        },
      },
    }),
  );

  app.enableVersioning();

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new AllExceptionFilter(),
    new ValidationExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      transform: true,
      dismissDefaultMessages: configService.isProduction,
      exceptionFactory: (errors) => {
        Logger.error(errors, '', 'ValidationPipe');

        return new ValidationException(errors);
      },
      forbidUnknownValues: true,
    }),
  );

  if (configService.appConfig.enableDocument) {
    setupSwagger(app);
  }

  app.use(expressCtx);

  initializeTransactionalContext();

  // Starts listening for shutdown hooks
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }
  
  const port = configService.appConfig.port as number;
  await app.listen(port);
  Logger.log(`Server is listening on port ${port}`, 'Boostrap');

  return app;
}

void bootstrap();
