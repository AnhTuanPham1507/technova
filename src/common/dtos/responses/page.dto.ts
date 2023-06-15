import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PageMetaDTO } from './page-meta.dto';

export class PageDTO<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({ type: () => PageMetaDTO })
  meta: PageMetaDTO;

  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}
