import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBreweryCommand } from './create-brewery.command';
import { firstValueFrom, from, map } from 'rxjs';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BreweryResponse } from '@brewdude/global/types';
import { BreweryService } from '../../../services/brewery.service';

@CommandHandler(CreateBreweryCommand)
export class CreateBreweryCommandHandler
  implements ICommandHandler<CreateBreweryCommand, BreweryResponse>
{
  private readonly logger: Logger = new Logger(
    CreateBreweryCommandHandler.name
  );

  constructor(private breweryService: BreweryService) {}

  execute(command: CreateBreweryCommand): Promise<BreweryResponse> {
    this.logger.log(`Creating brewery ${command.request.name}...`);

    return firstValueFrom(
      this.breweryService.createBrewery(command.request, new Date()).pipe(
        map((brewery) => {
          if (!brewery) {
            throw new HttpException(
              'An unexpected error occurred while creating brewery.',
              HttpStatus.INTERNAL_SERVER_ERROR
            );
          }

          return {
            brewery,
          } as BreweryResponse;
        })
      )
    );
  }
}
