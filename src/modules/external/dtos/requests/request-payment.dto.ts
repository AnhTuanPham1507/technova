import { IsJSON, IsNumber, IsOptional, IsString } from "class-validator";

export class RequestPaymentDTO {
  
  @IsString()
  requestId: string;

  @IsString()
  orderId: string;

  @IsString()
  orderInfo: string;

  @IsNumber()
  amount: number;

  @IsJSON()
  @IsOptional()
  extraData: string;

}
