import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";


export class CreatePaymentDTO {

    @ApiProperty({
        name: 'momoId'
    })
    @IsNumber()
    momoId: number;


    @ApiProperty({
        name: 'orderId'
    })
    @IsUUID(4)
    orderId: string;
}
