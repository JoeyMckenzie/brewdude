import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BrewdudeIoApiSharedServicesModule } from '@brewdude/brewdude-io-api/shared/services';
import { BrewdudeIoApiFeaturesAuthenticationModule } from '@brewdude/brewdude-io-api/features/authentication';

import { RegisterUserCommandHandler } from './cqrs/commands/register-user/register-user.handler';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { LoginUserCommandHandler } from './cqrs/commands/login-user/login-user.handler';

@Module({
  imports: [
    CqrsModule,
    BrewdudeIoApiSharedServicesModule,
    BrewdudeIoApiFeaturesAuthenticationModule,
  ],
  controllers: [UsersController],
  providers: [
    RegisterUserCommandHandler,
    LoginUserCommandHandler,
    UsersService,
  ],
})
export class BrewdudeIoApiFeaturesUsersModule {}
