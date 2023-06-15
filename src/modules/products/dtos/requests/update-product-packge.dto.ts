import { CurrencyEnum } from "@constants/enums/currency.enum";
import { TimeRangeEnum } from "@constants/enums/time-range.enum";
import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateProductPackageDTO {
    @ApiProperty({
        name: 'name',
        example: 'free'
    })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({
        name: 'userNumber',
        example: 1
    })
    @IsNumber()
    @IsOptional()
    userNumber: number;

    @ApiProperty({
        name: 'timeRange',
        example: 1
    })
    @IsNumber()
    @IsOptional()
    timeRangeNumber: number;

    @ApiProperty({
        name: 'price',
        type: 'enum',
        enum: TimeRangeEnum,
        example: TimeRangeEnum.DAY
    })
    @IsEnum(TimeRangeEnum)
    @IsOptional()
    timeRange: TimeRangeEnum;
    
    @ApiProperty({
        name: 'price',
        example: 300000
    })
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiProperty({
        name: 'currency',
        type: 'enum',
        enum: CurrencyEnum,
        example: CurrencyEnum.vnd
    })
    @IsEnum(CurrencyEnum)
    @IsOptional()
    currency: CurrencyEnum;
}