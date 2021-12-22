import { PrismaService } from '@brewdude/brewdude-io-api/shared/services';
import { UpsertBreweryRequest, SortOrder } from '@brewdude/global/types';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, EMPTY, from, map } from 'rxjs';

@Injectable()
export class BreweryService {
  private readonly logger = new Logger(BreweryService.name);

  constructor(private prisma: PrismaService) {}

  getBrewery(id: string) {
    return from(
      this.prisma.brewery.findFirst({
        where: {
          id: id,
        },
        include: {
          address: {
            select: {
              streetAddress: true,
              streetAddressExtended: true,
              city: true,
              state: true,
              zipCode: true,
              zipCodeExtension: true,
            },
          },
          beers: {
            select: {
              name: true,
              abv: true,
              ibu: true,
            },
          },
        },
      })
    ).pipe(
      map((brewery) => {
        if (!brewery) {
          this.logger.warn(`Brewery with ID ${id} was not found.`);
          return;
        }

        return brewery;
      }),
      catchError((error) => {
        this.logger.error(`An error occurred while retrieving brewery ${id}`);
        this.logger.error(error);
        return EMPTY;
      })
    );
  }

  peekBrewery(id: string) {
    return from(
      this.prisma.brewery.count({
        where: {
          id,
        },
      })
    ).pipe(
      catchError((error) => {
        this.logger.error(`An error occurred while peeking brewery ${id}.`);
        this.logger.error(error);
        return EMPTY;
      })
    );
  }

  getBreweries(limit: number, offset: number, sortOrder: SortOrder) {
    return from(
      this.prisma.brewery.findMany({
        include: {
          address: {
            select: {
              streetAddress: true,
              streetAddressExtended: true,
              city: true,
              state: true,
              zipCode: true,
              zipCodeExtension: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: {
          name: sortOrder,
        },
      })
    ).pipe(
      catchError((error) => {
        this.logger.error('An error occurred while retrieving breweries.');
        this.logger.error(error);
        return EMPTY;
      })
    );
  }

  createBrewery(request: UpsertBreweryRequest, currentDateTime: Date) {
    return from(
      this.prisma.brewery.create({
        data: {
          createdAt: currentDateTime,
          updatedAt: currentDateTime,
          name: request.name,
          address: {
            create: {
              ...request.address,
              createdAt: currentDateTime,
              updatedAt: currentDateTime,
            },
          },
        },
        include: {
          address: {
            select: {
              streetAddress: true,
              streetAddressExtended: true,
              city: true,
              state: true,
              zipCode: true,
              zipCodeExtension: true,
            },
          },
        },
      })
    ).pipe(
      catchError((error) => {
        this.logger.error('An error occurred while creating brewery.');
        this.logger.error(error);
        return EMPTY;
      })
    );
  }

  updateBrewery(
    request: UpsertBreweryRequest,
    currentDateTime: Date,
    id: string
  ) {
    return from(
      this.prisma.brewery.update({
        data: {
          createdAt: currentDateTime,
          updatedAt: currentDateTime,
          name: request.name,
          address: {
            create: {
              ...request.address,
              createdAt: currentDateTime,
              updatedAt: currentDateTime,
            },
          },
        },
        include: {
          address: {
            select: {
              streetAddress: true,
              streetAddressExtended: true,
              city: true,
              state: true,
              zipCode: true,
              zipCodeExtension: true,
            },
          },
        },
        where: {
          id,
        },
      })
    ).pipe(
      catchError((error) => {
        this.logger.error('An error occurred while updating brewery.');
        this.logger.error(error);
        return EMPTY;
      })
    );
  }
}
