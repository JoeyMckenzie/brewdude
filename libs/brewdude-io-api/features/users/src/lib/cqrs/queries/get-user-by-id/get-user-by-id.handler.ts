import { UserResponse } from '@brewdude/global/types';
import { HttpException, HttpStatus } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { firstValueFrom, map } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery, UserResponse>
{
  constructor(private usersService: UsersService) {}

  execute(query: GetUserByIdQuery): Promise<UserResponse> {
    const { userId } = query;

    return firstValueFrom(
      this.usersService.getUser(userId).pipe(
        map((user) => {
          if (!user) {
            throw new HttpException(
              'An error occured while creating the user.',
              HttpStatus.INTERNAL_SERVER_ERROR
            );
          }

          const { email, username, verified, role } = user;

          return {
            user: {
              email,
              username,
              verified,
              role,
            },
          } as UserResponse;
        })
      )
    );
  }
}
