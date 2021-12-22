import { ICommand } from '@nestjs/cqrs';

export class LoginUserCommand implements ICommand {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {}
}
