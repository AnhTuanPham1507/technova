import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailPayloadDTO } from '../dtos/requests/send-email-payload.dto';


export interface IMailService {
  sendMail(payload: SendEmailPayloadDTO): Promise<void> ;
}

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendMail(payload: SendEmailPayloadDTO): Promise<void> {
    return this.mailerService.sendMail(payload)
  }
}