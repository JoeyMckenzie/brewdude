import { Logger } from '@nestjs/common';
import { catchError, EMPTY, filter, from, map, mergeMap } from 'rxjs';
import { PrismaService } from './prisma.service';

export class Seeder {
  private readonly logger: Logger = new Logger(Seeder.name);

  constructor(private prisma: PrismaService) {}

  seedUsers() {
    return from(this.prisma.address.count()).pipe(
      filter((count: number) => count === 0),
      mergeMap(() =>
        from(
          this.prisma.address.create({
            data: {
              createdAt: new Date(),
              updatedAt: new Date(),
              city: 'Redding',
              state: 'CA',
              zipCode: '96003',
              streetAddress: '1707 Whistling Dr.',
            },
          })
        ).pipe(
          map(() => this.logger.log('Addresses seeded!')),
          catchError((error) => {
            this.logger.error(error);
            return EMPTY;
          })
        )
      )
    );
  }
}
