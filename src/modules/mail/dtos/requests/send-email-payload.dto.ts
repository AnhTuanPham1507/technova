import { IsEmail, IsObject, IsString } from "class-validator";

export class SendEmailPayloadDTO {
    @IsEmail()
    to: string;

    @IsEmail()
    from: string;

    @IsString()
    subject: string;

    @IsString()
    template: string;

    @IsObject()
    context: object;

    constructor(to: string, from: string, subject: string, template: string, context: object){
        this.to = to;
        this.from = from;
        this.subject = subject;
        this.template = template;
        this.context = context;
    }
}