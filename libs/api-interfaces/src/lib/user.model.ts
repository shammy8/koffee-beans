import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface UserWithoutPassword {
  _id: string;
  username: string;
  email: string;
}

export interface UserAccessToken extends UserWithoutPassword {
  iat: number;
  exp: number;
}

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  // @MinLength(6)
  username!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}

export class LoginUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  password!: string;
}
