import { ApiProperty } from "@nestjs/swagger";
import {IsString } from "class-validator";

export class CreateNotificationDTO {

    @ApiProperty({
        name: 'content'
    })
    @IsString()
    content: string;

    constructor(content: string){
        this.content = content;
    }
}
