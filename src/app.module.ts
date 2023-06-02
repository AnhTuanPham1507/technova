import './boilerplate.polyfill';

import { LoggerMiddleware } from '@middlewares/logger.middleware';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module, RequestMethod } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';
import path from 'path';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ProductModule } from '@modules/products/product.module';
import { BrandModule } from '@modules/brands/brand.module';
import { CategoryModule } from '@modules/categories/category.module';
import { SharedModule } from '@modules/shared/shared.module';
import { EnvConfigService } from '@modules/shared/services/api-config.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ProductModule,
    BrandModule,
    CategoryModule,
    ScheduleModule.forRoot(),
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: EnvConfigService): TypeOrmModuleOptions =>
        configService.databaseConfig,
      // eslint-disable-next-line @typescript-eslint/require-await
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
      inject: [EnvConfigService],
    }),
    BullModule.forRootAsync({
      useFactory: (configService: EnvConfigService) => ({
        redis: {
          host: configService.redisConfig.host,
          port: configService.redisConfig.port,
          password: configService.redisConfig.password,
        },
      }),
      inject: [EnvConfigService],
    }),
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('/v1/auth/login', '/v1/auth/refresh-token', '/v1/auth/token')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
