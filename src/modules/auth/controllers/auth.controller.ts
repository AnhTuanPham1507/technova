import { Body, Controller, HttpStatus, Inject, Patch, Post} from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtPayload } from "jsonwebtoken";
import { ForgotPasswordDTO } from "../dtos/requests/forgot-password.dto";
import { LoginDTO } from "../dtos/requests/login.dto";
import { UpdateAccountDTO } from "../dtos/requests/update-account.dto";
import { AccountDTO } from "../dtos/responses/account.dto";
import { IAuthService } from "../services/auth.service";


@Controller('/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Post('/login')
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({
    description: 'Login successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  login(
    @Body() body: LoginDTO,
  ): Promise<JwtPayload> {
    return this.authService.signIn(body);
  }

  @Patch('/update-password')
  @ApiBody({ type: UpdateAccountDTO })
  @ApiOkResponse({
    description: 'Login successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  updatePassword(
    @Body() body: UpdateAccountDTO,
  ): Promise<AccountDTO> {
    return this.authService.updatePassword(body);
  }

  @Post('/login-admin')
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({
    description: 'Login successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  loginAdmin(
    @Body() body: LoginDTO,
  ): Promise<JwtPayload> {
    return this.authService.signInAdmin(body);
  }

  @Post('/forgot-password')
  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({
  })
  @ApiUnauthorizedResponse()
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server errors.',
  })
  forgotPassword(
    @Body() body: ForgotPasswordDTO,
  ): Promise<void> {
    return this.authService.forgotPassword(body);
  }
}
