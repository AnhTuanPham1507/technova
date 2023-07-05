import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto";
import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsBooleanString, IsDateString, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";


export class OrderPageOptionsDTO extends PageOptionsDTO {

    @ApiProperty({
        name: 'email',
        example: 'abc@gmail.com'
    })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({
        name: 'startDate'
    })
    @IsOptional()
    @IsDateString()
    startDate: Date;

    @ApiProperty({
        name: 'endDate'
    })
    @IsOptional()
    @IsDateString()
    endDate: Date;

    @ApiProperty({
        name: 'status'
    })
    @IsOptional()
    @IsEnum(OrderStatusEnum)
    status: OrderStatusEnum;

    @ApiProperty({
        name: 'isPaid',
        example: true
    })
    @IsBoolean()
    @IsOptional()
    @Transform(({ value} ) => value === 'true')
    isPaid: boolean;
}