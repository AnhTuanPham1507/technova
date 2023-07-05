import { PageOptionsDTO } from "@common/dtos/requests/page-options.dto"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsOptional } from "class-validator"


export class NotificationPageOptionsDTO extends PageOptionsDTO{

    @ApiProperty({
        name: 'isRead'
    })
    @IsOptional()
    // @IsBoolean()
    isRead: boolean
}