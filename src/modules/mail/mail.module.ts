import { MailerModule, MailerOptions } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SharedModule } from "@modules/shared/shared.module";
import { EnvConfigService } from "@modules/shared/services/api-config.service";
import { MailService } from "./services/mail.service";
import path from "path";
import { MailController } from "./controllers/mail.controller";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: EnvConfigService): MailerOptions => {
                return {
                    transport: {
                        host: configService.mailConfig.host,
                        port: configService.mailConfig.port,
                        secure: false,
                        auth: {
                          user: configService.mailConfig.user,
                          pass: configService.mailConfig.password,
                        },
                      },
                      defaults: {
                        from: '"No Reply @Technova',
                      },
                      preview: false,
                      template: {
                        dir: path.join(__dirname,'templates'),
                        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                        options: {
                          strict: true,
                        },
                      },
                } 
            },
            inject: [EnvConfigService],
          }),
    ],
    providers: [
        {
            provide: 'IMailService',
            useClass: MailService
        },
    ],
    controllers: [MailController],
    exports: [
        'IMailService'
    ]
})
export class MailModule{}