import { BreweryResponse } from '@brewdude/global/types';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { firstValueFrom, map } from 'rxjs';
import { BreweryService } from '../../../services/brewery.service';
import { GetBreweryQuery } from './get-brewery.query';

@QueryHandler(GetBreweryQuery)
export class GetBreweryQueryHandler
  implements IQueryHandler<GetBreweryQuery, BreweryResponse>
{
  constructor(private breweryService: BreweryService) {}

  execute(query: GetBreweryQuery): Promise<BreweryResponse> {
    const { breweryId } = query;

    if (isNaN(+breweryId)) {
      throw new HttpException(
        'Invalid brewery ID was passed on the request.',
        HttpStatus.BAD_REQUEST
      );
    }

    return firstValueFrom(
      this.breweryService.getBrewery(breweryId).pipe(
        map((brewery) => {
          if (!brewery) {
            throw new HttpException('Brewery not found.', HttpStatus.NOT_FOUND);
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
      )
    );
  }
}
