import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBreweryCommand } from './update-brewery.command';
import { firstValueFrom, map, mergeMap } from 'rxjs';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BreweryResponse } from '@brewdude/global/types';
import { BreweryService } from '../../../services/brewery.service';

@CommandHandler(UpdateBreweryCommand)
export class UpdateBreweryCommandHandler
  implements ICommandHandler<UpdateBreweryCommand, BreweryResponse>
{
  private readonly logger: Logger = new Logger(
    UpdateBreweryCommandHandler.name
  );

  constructor(private breweryService: BreweryService) {}

  execute(command: UpdateBreweryCommand): Promise<BreweryResponse> {
    this.logger.log(`Updating brewery ${command.id}...`);

    return firstValueFrom(
      this.breweryService.peekBrewery(command.id).pipe(
        mergeMap((count) => {
          if (!count || count === 0) {
            throw new HttpException(
              `Brewery with ID ${command.id} was not found.`,
              HttpStatus.NOT_FOUND
            );
          }

          return this.breweryService
            .updateBrewery(command.request, new Date(), command.id)
            .pipe(
              map((brewery) => {
                if (!brewery) {
                  throw new HttpException(
                    'An unexpected error occurred while creating brewery.',
                    HttpStatus.INTERNAL_SERVER_ERROR
                  );
                }

                return {
                  brewery: {
                    id: brewery.id,
                    name: brewery.name,
                    address: {
                      streetAddress: brewery.address.streetAddress,
                      streetAddressExtended:
                        brewery.address.streetAddressExtended ?? '',
                      city: brewery.address.city,
                      state: brewery.address.state,
                      zipCode: brewery.address.zipCode,
                      zipCodeExtension: brewery.address.zipCodeExtension ?? '',
                    },
                  },
                } as BreweryResponse;
              })
            );
        })
      )
    );
  }
}
