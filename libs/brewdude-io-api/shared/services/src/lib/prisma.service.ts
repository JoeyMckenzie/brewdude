import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { catchError, EMPTY, from, take } from 'rxjs';
import { Seeder } from './seeder';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  onModuleInit() {
    this.logger.log('Creating Prisma client instance...');

    from(this.$connect())
      .pipe(
        take(1),
        catchError((error) => {
          this.logger.error(
            'Error occurred while opening connection to database with Prisma.'
          );
          this.logger.error(error);
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.logger.log('Prisma initialized!');

        const seedOnStartup =
          this.configService.get<boolean>('SEED_ON_STARTUP');

        if (
          seedOnStartup &&
          (seedOnStartup === true || seedOnStartup === 'true')
        ) {
          this.logger.log(
            'Prisma successfully initialized! Seeding database...'
          );
          new Seeder(this)
            .seedUsers()
            .pipe(take(1))
            .subscribe(() => this.logger.log('Seeded!'));
        }
      });
  }

  enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', () => {
      from(app.close())
        .pipe(
          take(1),
          catchError((error) => {
            this.logger.error('Error occurred destroying Prisma client.');
            this.logger.error(error);
            return EMPTY;
          })
        )
        .subscribe(() => this.logger.log('Prisma successfully shutdown!'));
    });
  }
}
