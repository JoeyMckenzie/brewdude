import { PrismaService } from '@brewdude/brewdude-io-api/shared/services';
import { Injectable, Logger } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { catchError, EMPTY, from } from 'rxjs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prismaService: PrismaService) {}

  searchUsers(email: string, username: string) {
    return from(
      this.prismaService.user.findFirst({
        where: {
          email,
          OR: { username },
        },
      })
    );
  }

  searchUsersByUsername(username: string) {
    return from(
      this.prismaService.user.findFirst({
        where: {
          username,
        },
      })
    );
  }

  getUser(id: string) {
    return from(
      this.prismaService.user.findFirst({
        where: {
          id,
        },
      })
    ).pipe(
      catchError((error) => {
        this.logger.error(`An error occurred while retrieving user ${id}`);
        this.logger.error(error);
        return EMPTY;
      })
    );
  }

  createUser(
    email: string,
    username: string,
    hashedPassword: string,
    generatedSalt: string,
    role: UserRole
  ) {
    const currentDate = new Date();

    return from(
      this.prismaService.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          salt: generatedSalt,
          createdAt: currentDate,
          updatedAt: currentDate,
          role: role,
          verified: false,
        },
      })
    ).pipe(
      catchError((error) => {
        this.logger.error(
          `An error occurred while creating user ${email}:${username}`
        );
        this.logger.error(error);
        return EMPTY;
      })
    );
  }
}
