import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserRequest {
  @IsNotEmpty()
  username?: string;

  @IsNotEmpty()
  password?: string;
}

export class RegisterUserRequest extends LoginUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
