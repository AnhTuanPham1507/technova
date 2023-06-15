import { Body, Controller, HttpStatus, Inject, Post} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtPayload } from "jsonwebtoken";
import { LoginDTO } from "../dtos/requests/login.dto";
import { IAuthService } from "../services/auth.service";


@Controller('/v1/auth')
@ApiTags('Auth')
@ApiBearerAuth()
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
  createAuth(
    @Body() body: LoginDTO,
  ): Promise<JwtPayload> {
    return this.authService.signIn(body);
  }
}
