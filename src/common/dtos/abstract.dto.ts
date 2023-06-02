import { ApiProperty } from '@nestjs/swagger';

import type { AbstractEntity } from '../abstract.entity';

export class AbstractDTO {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier',
    example: '1104',
  })
  id: string;

  @ApiProperty({ name: 'createdAt' })
  createdAt?: Date;

  @ApiProperty({ name: 'updatedAt' })
  updatedAt?: Date;

  @ApiProperty({ name: 'deletedAt' })
  deletedAt?: Date;

  constructor(entity: AbstractEntity, options?: { excludeFields?: boolean }) {
    if (!options?.excludeFields) {
      this.id = entity.id;
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
      this.deletedAt = entity.deletedAt;
    }
  }
}
