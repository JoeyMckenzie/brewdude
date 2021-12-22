import { BrewdudeIoApiSharedServicesModule } from '@brewdude/brewdude-io-api/shared/services';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterUserCommandHandler } from './cqrs/commands/register-user/register-user.handler';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [CqrsModule, BrewdudeIoApiSharedServicesModule],
  controllers: [UsersController],
  providers: [RegisterUserCommandHandler, UsersService],
})
export class BrewdudeIoApiFeaturesUsersModule {}
