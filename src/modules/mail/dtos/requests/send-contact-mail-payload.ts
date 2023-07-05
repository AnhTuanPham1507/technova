import { Expose } from "class-transformer";
import { IsEmail, IsObject, IsString } from "class-validator";

export class SendContactEmailPayloadDTO {
    @IsEmail()
    @Expose({name: 'email'})
    from: string;

    @IsString()
    subject: string;

    @IsString()
    content: string;

    constructor(from: string, subject: string, content: string){
        this.from = from;
        this.subject = subject;
        this.content = content;
    }
}