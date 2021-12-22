import { RegisterUserRequest } from '@brewdude/global/types';
import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
  readonly email: string;
  readonly username: string;
  readonly password: string;

  constructor(private request: RegisterUserRequest) {
    this.email = this.request.email ?? '';
    this.username = this.request.username ?? '';
    this.password = this.request.password ?? '';
  }
}
