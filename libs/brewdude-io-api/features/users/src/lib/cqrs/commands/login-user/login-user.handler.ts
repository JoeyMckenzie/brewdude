import { UserResponse } from '@brewdude/global/types';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { catchError, firstValueFrom, from, map, mergeMap } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { LoginUserCommand } from './login-user.command';
import { hash } from 'bcrypt';

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler
  implements ICommandHandler<LoginUserCommand, UserResponse>
{
  private readonly logger = new Logger(LoginUserCommandHandler.name);

  constructor(private usersService: UsersService) {}

  execute(command: LoginUserCommand): Promise<UserResponse> {
    const { username, password } = command;

    return firstValueFrom(
      this.usersService.searchUsersByUsername(username).pipe(
        map((user) => {
          if (!user) {
            throw new HttpException(
              'That user was not found.',
              HttpStatus.NOT_FOUND
            );
          }

          return user;
        }),
        mergeMap((user) =>
          from(hash(password, user.salt)).pipe(
            map((hashedPassword) => ({
              hashedPassword,
              user,
            }))
          )
        ),
        map(({ hashedPassword, user }) => {
          if (hashedPassword !== user.password) {
            throw new HttpException(
              'Invalid login attempt, please try again.',
              HttpStatus.UNAUTHORIZED
            );
          }

          const { email, username, verified, role } = user;

          this.logger.log(
            `User ${email}:${username} login attempt was successful!`
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
