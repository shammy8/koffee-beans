import { CreateUserDTO, LoginUserDTO } from '@koffee-beans/api-interfaces';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../user/models/user.schema';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: CreateUserDTO) {
    return this.authService.registerUser(body);
  }

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
  @UseGuards(AuthGuard('jwt')) // runs the jwt-strategy guard first before this method
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
