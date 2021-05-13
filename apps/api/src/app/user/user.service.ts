import {
  CreateUserDTO,
  LoginUserDTO,
  UserWithoutPassword,
} from '@koffee-beans/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.schema';
import * as bcrypt from 'bcrypt';
import { TokenResponse } from 'plaid';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findUser(user: LoginUserDTO) {
    return this.userModel.findOne({ email: user.email }).exec(); // look in user collection on mongodb
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    const newUser = {
      ...createUserDTO,
      password: hashedPassword,
      accessTokens: [],
    };
    return new this.userModel(newUser).save();
  }

  async addPlaidAccessToken(
    accessToken: TokenResponse,
    user: UserWithoutPassword
  ) {
    return this.userModel
      .findByIdAndUpdate(user._id, {
        $push: { accessTokens: accessToken.access_token },
      })
      .exec();
  }
}
