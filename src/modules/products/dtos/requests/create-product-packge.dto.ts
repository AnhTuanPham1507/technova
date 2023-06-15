import { CurrencyEnum } from "@constants/enums/currency.enum";
import { TimeRangeEnum } from "@constants/enums/time-range.enum";
import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateProductPackageDTO {
    @ApiProperty({
        name: 'name',
        example: 'free'
    })
    @IsString()
    name: string;

    @ApiProperty({
        name: 'userNumber',
        example: 1
    })
    @IsNumber()
    userNumber: number;

    @ApiProperty({
        name: 'timeRange',
        example: 1
    })
    @IsNumber()
    timeRangeNumber: number;

    @ApiProperty({
        name: 'price',
        type: 'enum',
        enum: TimeRangeEnum,
        example: TimeRangeEnum.DAY
    })
    @IsEnum(TimeRangeEnum)
    timeRange: TimeRangeEnum;
    
    @ApiProperty({
        name: 'price',
        example: 300000
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        name: 'currency',
        type: 'enum',
        enum: CurrencyEnum,
        example: CurrencyEnum.vnd
    })
    @IsEnum(CurrencyEnum)
    currency: CurrencyEnum;

    @ApiProperty({
        name: 'productId',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    @IsUUID(4)
    productId: string;

}