import { ICacheService } from '@modules/shared/services/cache.service';
import { Controller, Delete, Inject, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('cache')
@ApiTags('Cache')
  // @Auth({ strategies: [AuthStrategy.CACHE_BASIC] })
export class CacheController {
  constructor(@Inject('ICacheService') private cacheService: ICacheService) {}

  @Delete('flush')
  @ApiOkResponse()
  async flushCaches() {
    await this.cacheService.clear();
  }

  @Delete(':key/flush')
  @ApiOkResponse()
  async flushKey(@Param('key') key: string) {
    await this.cacheService.delete(key);
  }
}
