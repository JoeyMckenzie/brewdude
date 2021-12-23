import { LoginUserRequest, RegisterUserRequest } from '@brewdude/global/types';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserCommand } from './cqrs/commands/login-user/login-user.command';
import { RegisterUserCommand } from './cqrs/commands/register-user/register-user.command';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private commandBus: CommandBus) {}

  @Post('register')
  registerUser(@Body() request: RegisterUserRequest) {
    this.logger.log(`Received request to register user ${request.email}`);
    return this.commandBus.execute(new RegisterUserCommand(request));
  }

  @Post('login')
  loginUser(@Body() request: LoginUserRequest) {
    this.logger.log(`Received request to login user ${request.username}`);
    return this.commandBus.execute(new LoginUserCommand(request));
  }
}
