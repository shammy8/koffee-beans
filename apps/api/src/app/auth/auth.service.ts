import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import {
  CreateUserDTO,
  LoginUserDTO,
  UserWithoutPassword,
} from '@koffee-beans/api-interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(userDTO: CreateUserDTO) {
    try {
      await this.userService.createUser(userDTO);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async validateUser(userDTO: LoginUserDTO) {
    const user = await this.userService.findUser(userDTO);
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        userDTO.password,
        user.password
      );
      if (isPasswordCorrect === true) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userWithoutPassword: UserWithoutPassword = {
          username: user.username,
          email: user.email,
          _id: user._id,
        };
        return userWithoutPassword;
      }
    }
    return null;
  }

  // returns the JWT based on user id and user name
  async login(user: any) {
    const payload = { sub: user._id, name: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
