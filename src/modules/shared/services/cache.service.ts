import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { EnvConfigService } from './api-config.service';

export interface ICacheService {
  get(key: string): Promise<any>;
  set(key: string, data: any, ttl?: number): Promise<void>;
  clear(): Promise<void>;
  delete(key: string): Promise<void>;
}

@Injectable()
export class CacheService implements ICacheService {
  private defaultTtl: number;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: EnvConfigService,
  ) {
    this.defaultTtl = this.configService.redisConfig.ttl;
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    const dataTtl = ttl ? ttl : this.defaultTtl;
    await this.cacheManager.set(key, data, {
      ttl: dataTtl,
    });
  }

  async clear(): Promise<void> {
    await this.cacheManager.reset();
  }

  async delete(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
