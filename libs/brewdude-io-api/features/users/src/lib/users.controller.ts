import { RegisterUserRequest } from '@brewdude/global/types';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from './cqrs/commands/register-user/register-user.command';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private commandBus: CommandBus) {}

  @Post('register')
  registerUser(@Body() request: RegisterUserRequest) {
    this.logger.log(`Received request to register users ${request.email}`);
    return this.commandBus.execute(new RegisterUserCommand(request));
  }
}
