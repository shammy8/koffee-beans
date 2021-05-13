import {
  CreateUserDTO,
  LoginUserDTO,
  UserAccessToken,
} from '@koffee-beans/api-interfaces';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: CreateUserDTO) {
    return this.authService.registerUser(body);
  }

  @Public()
  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const user = await this.authService.validateUser(loginUserDTO);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  // TODO for example only, probably delete this later or expand
  @ApiBearerAuth() // for swagger to allow you to add bearer
  @Get('user_profile')
  getUserProfile(@Request() req: { user: UserAccessToken }) {
    return req.user;
  }
}
