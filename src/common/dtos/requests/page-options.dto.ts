
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { QueryTypeEnum } from '@constants/enums/query-type.enum';
import { OrderEnum } from '@constants/enums/order.enum';
import { OrderByEnum } from '@constants/enums/order-by.enum';

export class PageOptionsDTO {
  @IsEnum(QueryTypeEnum)
  @IsOptional()
  @ApiPropertyOptional({ default: QueryTypeEnum.ALL, enum: QueryTypeEnum })
  queryType: QueryTypeEnum = QueryTypeEnum.ALL;

  @IsEnum(OrderEnum)
  @IsOptional()
  @ApiPropertyOptional({ default: OrderEnum.DESC, enum: OrderEnum })
  order: OrderEnum = OrderEnum.DESC;

  @ApiPropertyOptional({
    enum: OrderByEnum,
    default: OrderByEnum.CREATED_AT,
  })
  @IsEnum(OrderByEnum)
  @IsOptional()
  readonly orderBy: OrderByEnum = OrderByEnum.CREATED_AT;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  q?: string;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
