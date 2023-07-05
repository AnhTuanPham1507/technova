import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailPayloadDTO } from '../dtos/requests/send-email-payload.dto';
import { SendContactEmailPayloadDTO } from '../dtos/requests/send-contact-mail-payload';
import { EnvConfigService } from '@modules/shared/services/api-config.service';


export interface IMailService {
  sendMail(payload: SendEmailPayloadDTO): Promise<void>;
  sendContactMail(payload: SendContactEmailPayloadDTO): Promise<void>;
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: EnvConfigService
  ) {}

  public sendMail(payload: SendEmailPayloadDTO): Promise<void> {
    return this.mailerService.sendMail(payload)
  }

  sendContactMail(payload: SendContactEmailPayloadDTO): Promise<void>{
    return this.mailerService.sendMail({
      subject: payload.subject,
      from: payload.from,
      to: this.configService.mailConfig.user,
      html: payload.content
    })
  }
}