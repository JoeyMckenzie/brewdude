import { UserResponse } from '@brewdude/global/types';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from './register-user.command';
import { genSalt, hash } from 'bcrypt';
import { catchError, firstValueFrom, from, map, mergeMap } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { UserRole } from '@prisma/client';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler
  implements ICommandHandler<RegisterUserCommand, UserResponse>
{
  private readonly logger = new Logger(RegisterUserCommandHandler.name);

  constructor(private usersService: UsersService) {}

  execute(command: RegisterUserCommand): Promise<UserResponse> {
    const { email, username, password } = command;

    return firstValueFrom(
      // Verify the requesting registration is unique
      this.usersService.searchUsers(email, username).pipe(
        map((user) => {
          if (user) {
            throw new HttpException(
              'That username or email is already taken.',
              HttpStatus.BAD_REQUEST
            );
          }
        }),
        // Generate a salt to store with the user record, hash their password, and create the user
        mergeMap(() => from(genSalt())),
        mergeMap((salt) =>
          from(hash(password, salt)).pipe(
            map((hashedPassword) => ({ hashedPassword, salt }))
          )
        ),
        mergeMap(({ hashedPassword, salt }) =>
          this.usersService.createUser(
            email,
            username,
            hashedPassword,
            salt,
            UserRole.DrinkingBuddy
          )
        ),
        // Verify the response and map to a user view
        map((user) => {
          if (!user) {
            throw new HttpException(
              'An unexpected error occurred while registering user.',
              HttpStatus.INTERNAL_SERVER_ERROR
            );
          }

          const { email, username, role, verified } = user;

          this.logger.log(
            `User ${email}:${username} was successfully created!`
          );

          return {
            user: {
              email,
              username,
              role,
              verified,
            },
          } as UserResponse;
        }),
        catchError((error) => {
          this.logger.error(
            'An error occurred while processing the registration request.'
          );
          this.logger.error(error);
          throw error;
        })
      )
    );
  }
}
