import { Expose } from "class-transformer";
import { IsNumber, IsString, IsUrl } from "class-validator";

export class ResponseMoMoDTO {

    @IsString()
    partnerCode: string;

    @IsString()
    requestId: string;

    @IsNumber()
    amount: number;

    @IsNumber()
    responseTime: number;

    @IsString()
    message: string;

    @IsNumber()
    resultCode: number;

    @IsUrl()
    payUrl: string;

    @IsUrl()
    @Expose({name: 'deeplink'})
    deepLink: string;

    @IsUrl()
    qrCodeUrl: string;
}