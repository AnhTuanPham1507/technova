import { MailModule } from "@modules/mail/mail.module";
import { EnvConfigService } from "@modules/shared/services/api-config.service";
import { SharedModule } from "@modules/shared/shared.module";
import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./controllers/auth.controller";
import { AccountEntity } from "./database/entities/account.entity";
import { AccountRepository } from "./database/repositories/account.repository";
import { AuthGuard } from "./guards/auth.guard";
import { RolesGuard } from "./guards/role.guard";
import { AuthService } from "./services/auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity
        ]),
        JwtModule.registerAsync({
            imports: [SharedModule],
            useFactory: async (configService: EnvConfigService) => {
                return {
                    secret: configService.authConfig.jwtPrivateKey,
                    global: true,
                    signOptions: { expiresIn: configService.authConfig.jwtExpirationTime },
                }
            },
            inject: [EnvConfigService],
          }),
          MailModule
    ],
    providers: [
        {
            provide: 'IAuthService',
            useClass: AuthService
        },
        {
            provide: 'IAccountRepository',
            useClass: AccountRepository
        },
        AuthGuard,
        RolesGuard,
        JwtService,
    ],
    controllers: [AuthController],
    exports: [
        'IAuthService',
        'IAccountRepository',
        AuthGuard,
        RolesGuard,
        JwtService,
    ]
})
export class AuthModule {}
