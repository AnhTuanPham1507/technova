import { EnvConfigService } from "@modules/shared/services/api-config.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./controllers/auth.controller";
import { AccountEntity } from "./database/entities/account.entity";
import { AccountRepository } from "./database/repositories/account.repository";
import { AuthService } from "./services/auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountEntity
        ]),
        JwtModule.registerAsync({
            useFactory: async (configService: EnvConfigService) => ({
                secret: configService.appConfig.jwtSecretKey,
                global: true,
                signOptions: { expiresIn: configService.appConfig.jwtExpiresIn },
            }),
            inject: [EnvConfigService],
          })
    ],
    providers: [
        {
            provide: 'IAuthService',
            useClass: AuthService
        },
        {
            provide: 'IAccountRepository',
            useClass: AccountRepository
        }
    ],
    controllers: [AuthController],
    exports: [
        'IAuthService',
        'IAccountRepository'
    ]
})
export class AuthModule {}
