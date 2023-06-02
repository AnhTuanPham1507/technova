import { HttpModule } from '@nestjs/axios';
import { CacheModule, Global, Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as redisStore from 'cache-manager-ioredis';

import { CacheController } from './controllers/cache.controller';
import { EnvConfigService } from './services/api-config.service';
import { CacheService } from './services/cache.service';
import { HttpService } from './services/http.service';

const providers = [
  EnvConfigService,
  Logger,
  {
    provide: 'ICacheService',
    useClass: CacheService,
  },
  HttpService,
];

@Global()
@Module({
  controllers: [CacheController],
  providers,
  imports: [
    HttpModule,
    CqrsModule,
    CacheModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: EnvConfigService) => ({
        store: redisStore,
        ...configService.redisConfig,
      }),
      inject: [EnvConfigService],
    }),
  ],
  exports: [...providers, HttpModule, CqrsModule, CacheModule],
})
export class SharedModule {}
