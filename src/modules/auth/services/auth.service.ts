import { RoleEnum } from '@constants/enums/role.enum';
import { EnvConfigService } from '@modules/shared/services/api-config.service';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountEntity } from '../database/entities/account.entity';
import { IAccountRepository } from '../database/repositories/account.repository';
import { CreateAccountDTO } from '../dtos/requests/create-account.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from '../dtos/requests/login.dto';

export interface jwtPayload {
    accessToken: string;
    expireIn: string;
}

export interface IAuthService {
    signIn(loginDTO: LoginDTO): Promise<jwtPayload>
}

@Injectable()
export class AuthService implements IAuthService{
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepo: IAccountRepository,
    private readonly jwtService: JwtService,
    private readonly configService: EnvConfigService
  ){}

  async signIn(loginDTO: LoginDTO): Promise<jwtPayload> {
    const account = await this.accountRepo.getByEmail(loginDTO.email);
    const isMatch = await bcrypt.compare(loginDTO.password, account?.password);

    if (isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: account.id, email: account.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      expireIn: this.configService.appConfig.jwtExpiresIn
    };
  }

  async create(createAccount: CreateAccountDTO): Promise<AccountEntity>{
    const {email, password} = createAccount;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const account = new AccountEntity(email, hashPassword, RoleEnum.USER);

    const createdAccount = this.accountRepo.save(account);

    return createdAccount;
  }
}