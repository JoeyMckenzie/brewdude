import { LoginUserRequest } from '@brewdude/global/types';
import { ICommand } from '@nestjs/cqrs';

export class LoginUserCommand implements ICommand {
  readonly username;
  readonly password;

  constructor(private request: LoginUserRequest) {
    this.username = request.username ?? '';
    this.password = request.password ?? '';
  }
}
