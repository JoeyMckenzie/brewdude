import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  password?: string;
}
