import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUUID, Min, ValidateNested } from "class-validator";
import { CreateOrderDetailDTO } from "./create-order-detail.dto";

export class CreateOrderDTO  {
    @ApiProperty({
        name: 'totalPrice',
        example: 1000000
    })
    @IsNumber()
    @Min(500)
    totalPrice;

    @ApiProperty({
        name: 'customerName',
        example: 'Tuan Pham'
    })
    @IsString()
    customerName: string;

    @ApiProperty({
        name: 'phone',
        example: '+84772294749'
    })
    @Transform((v) => "+84" + v.value )
    @IsPhoneNumber('VI')
    phone: string;

    @ApiProperty({
        name: 'email',
        example: 'pat@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        name: 'userId',
        example: 'UUID'
    })
    @IsUUID(4)
    @IsOptional()
    userId: string;

    @ApiProperty({
        name: 'details',
        type: CreateOrderDetailDTO,
        isArray: true
    })
    @Type(() => Array<CreateOrderDetailDTO>)
    @ValidateNested({each: true})
    details: CreateOrderDetailDTO[];
}