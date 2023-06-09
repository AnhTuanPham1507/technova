import { RoleEnum } from '@constants/enums/role.enum';
import { EnvConfigService } from '@modules/shared/services/api-config.service';
import { Injectable, UnauthorizedException, Inject, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountEntity } from '../database/entities/account.entity';
import { IAccountRepository } from '../database/repositories/account.repository';
import { CreateAccountDTO } from '../dtos/requests/create-account.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from '../dtos/requests/login.dto';
import { Moment } from '@/utils/my-moment.util';
import { AccountDTO } from '../dtos/responses/account.dto';
import { UpdateAccountDTO } from '../dtos/requests/update-account.dto';
import { ForgotPasswordDTO } from '../dtos/requests/forgot-password.dto';
import { SendEmailPayloadDTO } from '@modules/mail/dtos/requests/send-email-payload.dto';
import { uuid } from 'uuidv4';
import { IMailService } from '@modules/mail/services/mail.service';

export interface jwtPayload {
    accessToken: string;
    expireIn: string;
}

export interface IAuthService {
    signIn(loginDTO: LoginDTO): Promise<jwtPayload>;
    signInAdmin(loginDTO: LoginDTO): Promise<jwtPayload>;
    forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<void>;
    delete(id: string, actor: AccountDTO): Promise<AccountDTO>;
    create(createAccount: CreateAccountDTO): Promise<AccountEntity>;
    updatePassword(updateAccountDTO:  UpdateAccountDTO): Promise<AccountDTO>;
    getAdminAccount(): Promise<AccountDTO>;
    hashPassword(password: string): Promise<string>;
    save(account: AccountEntity): Promise<AccountEntity>;
}

@Injectable()
export class AuthService implements IAuthService{
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepo: IAccountRepository,
    private readonly jwtService: JwtService,
    private readonly configService: EnvConfigService,
    @Inject('IMailService')
    private readonly mailService: IMailService
  ){}

  async hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  }

  save(account: AccountEntity): Promise<AccountEntity>{
    return this.accountRepo.save(account);
  }

  async signIn(loginDTO: LoginDTO): Promise<jwtPayload> {
    const account = await this.accountRepo.getByEmail(loginDTO.email);
    const isMatch = await bcrypt.compare(loginDTO.password, account?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { id: account.id, email: account.email, role: account.role };
    return {
      accessToken: await this.jwtService.signAsync(JSON.stringify(payload), {
        secret: this.configService.authConfig.jwtPrivateKey,
      }),
      expireIn: this.configService.authConfig.jwtExpirationTime
    };
  }

  async signInAdmin(loginDTO: LoginDTO): Promise<jwtPayload> {
    const account = await this.accountRepo.getByEmail(loginDTO.email);

    const isMatch = await bcrypt.compare(loginDTO.password, account.password);

    if (!isMatch) {
      throw new UnauthorizedException(`Password is not correct`);
    }

    if(account.role !== RoleEnum.ADMIN && account.role !== RoleEnum.EMPLOYEE ){
      throw new ForbiddenException(`This is admin site, you don't have permission to access. Please contact admin to take action`)
    }

    const payload = { id: account.id, email: account.email, role: account.role };
    return {
      accessToken: await this.jwtService.signAsync(JSON.stringify(payload), {
        secret: this.configService.authConfig.jwtPrivateKey,
      }),
      expireIn: this.configService.authConfig.jwtExpirationTime
    };
  }

  async create(createAccount: CreateAccountDTO): Promise<AccountEntity>{
    const {email, password} = createAccount;
    const hashedPassword = await this.hashPassword(password);
    const account = new AccountEntity(email, hashedPassword, createAccount.role);

    const createdAccount = this.accountRepo.save(account);

    return createdAccount;
  }

  async forgotPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<void>{
    const account = await this.accountRepo.getByEmail(forgotPasswordDTO.email);
    const newPassword = uuid();
    account.password = await this.hashPassword(newPassword);

    await this.accountRepo.save(account);

    const subject = 'Lấy lại mật khẩu';
    const template = 'forgot-password.hbs';
    const context = {
      name: forgotPasswordDTO.email,
      new_password: newPassword,
      url: this.configService.mailConfig.redirectUrl
    };
    const payload = new SendEmailPayloadDTO(
      forgotPasswordDTO.email,
      this.configService.mailConfig.user,
      subject,
      template,
      context
    )
    await this.mailService.sendMail(payload);
  }

  async updatePassword(updateAccountDTO:  UpdateAccountDTO): Promise<AccountDTO>{
    const account = await this.accountRepo.getByEmail(updateAccountDTO.email);
    const isMatch = await bcrypt.compare(updateAccountDTO.currentPassword, account.password);

    if (!isMatch) {
      throw new UnauthorizedException(`Password is not correct`);
    }

    const hashedPassword = await this.hashPassword(updateAccountDTO.newPassword);

    account.password = hashedPassword;

    const updatedAccount = await this.accountRepo.save(account);
    return new AccountDTO(updatedAccount);
  }

  async delete(id: string, actor: AccountDTO): Promise<AccountDTO>{
    const account = await this.accountRepo.getById(id);
    account.deletedAt = Moment.getCurrentDate();
    account.deletedBy = actor.id;

    const deletedAccount = await this.accountRepo.save(account);

    return new AccountDTO(deletedAccount);
  }

  async getAdminAccount(): Promise<AccountDTO>{
    const admin = await  this.accountRepo.getAdminAccount();
    return new AccountDTO(admin);
  }
}