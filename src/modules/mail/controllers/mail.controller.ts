
import { Body, Controller, HttpStatus, Inject, Post } from "@nestjs/common";

import { ApiBody, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { IMailService } from "../services/mail.service";
import { SendContactEmailPayloadDTO } from "../dtos/requests/send-contact-mail-payload";

@Controller('/v1/mail')
@ApiTags('Mail')
export class MailController {
  constructor(
    @Inject('IMailService')
    private readonly mailService: IMailService,
  ) {}

  @Post('/contact')
  @ApiBody({ type: SendContactEmailPayloadDTO })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  createMail(
    @Body() body: SendContactEmailPayloadDTO,
  ): Promise<void> {
    return this.mailService.sendContactMail(body);
  }

}
