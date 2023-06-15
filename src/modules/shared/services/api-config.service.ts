import { Injectable } from '@nestjs/common';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import fs from 'fs';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.appEnv === 'development';
  }

  get isProduction(): boolean {
    return this.appEnv === 'production';
  }

  get isTest(): boolean {
    return this.appEnv === 'test';
  }

  get appEnv(): string {
    return this.appConfig.appEnv;
  }

  get databaseConfig(): TypeOrmModuleOptions {
    const entities = [
      __dirname + '/../../**/*.entity{.ts,.js}',
      __dirname + '/../../**/*.view-entity{.ts,.js}',
      __dirname + '/../../../common/entities/*.entity{.ts,.js}',
    ];

    return {
      entities,
      keepConnectionAlive: !this.isTest,
      dropSchema: this.isTest,
      type: this.configService.get('database.type'),
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.database'),
      logging: this.configService.get('database.logging'),
      ssl: this.isProduction
        ? {
            ca: fs
              .readFileSync(
                this.configService.get(
                  'database.caPath',
                ) as fs.PathOrFileDescriptor,
              )
              .toString(),
          }
        : false,
    };
  }

  get authConfig() {
    return {
      jwtPrivateKey: this.configService.get('auth.jwtPrivateKey'),
      jwtExpirationTime: this.configService.get('auth.jwtExpirationTime'),
      jwtRefreshKey: this.configService.get('auth.jwtRefreshKey'),
    };
  }

  get appConfig() {
    return {
      port: this.configService.get('app.port'),
      appEnv: this.configService.get('app.appEnv'),
      appMode: this.configService.get('app.appMode'),
      enableDocument: this.configService.get('app.enableDocument'),
      timezone: this.configService.get('app.timezone'),
      corsOrigins: this.configService.get('app.corsOrigins'),
      flushCacheUser: this.configService.get('app.flushCacheUser'),
      flushCachePassword: this.configService.get('app.flushCachePassword'),
      frontendUrl: this.configService.get('app.frontendUrl'),
      tribeChannelName: this.configService.get(
        'app.tribeChannelName',
      ) as string,
      jwtSecretKey: this.configService.get('app.jwtSecretKey') as string,
      jwtExpiresIn: this.configService.get('app.jwtExpiresIn') as string
    };
  }

  get redisConfig() {
    return {
      host: this.configService.get('redis.host'),
      port: this.configService.get('redis.port'),
      ttl: this.configService.get('redis.ttl'),
      password: this.configService.get('redis.password'),
    };
  }

  get rateLimitConfig() {
    return {
      ttl: Number.parseInt(
        this.configService.get('rate-limit.ttl') as string,
        10,
      ),
      max: Number.parseInt(
        this.configService.get('rate-limit.max') as string,
        10,
      ),
    };
  }

  get releaseVersion() {
    return {
      releaseVersion: process.env.VERSION as string,
    };
  }

  get cloudinary(){
    return {
      name: this.configService.get('cloudinary.name') as string,
      apiKey: this.configService.get('cloudinary.apiKey') as string,
      secretKey: this.configService.get('cloudinary.secretKey') as string,
    };
  }
}
