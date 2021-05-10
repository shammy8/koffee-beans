import { CreateUserDTO, LoginUserDTO } from '@koffee-beans/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findUser(user: LoginUserDTO) {
    return this.userModel.findOne({ email: user.email }).exec(); // look in user collection on mongodb
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    createUserDTO.password = hashedPassword;
    return new this.userModel(createUserDTO).save();
  }
}
