import { Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { BreweryService } from '../../../services/brewery.service';
import {
  BrewdudeIoApiSharedServicesModule,
  PrismaService,
} from '@brewdude/brewdude-io-api/shared/services';
import { EMPTY, from } from 'rxjs';
import { GetBreweryQueryHandler } from './get-brewery.handler';
import { GetBreweryQuery } from './get-brewery.query';
import { Prisma } from '@prisma/client';

describe(GetBreweryQueryHandler.name, () => {
  let handler: GetBreweryQueryHandler;
  let breweryService: BreweryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, BrewdudeIoApiSharedServicesModule],
      providers: [GetBreweryQueryHandler, BreweryService],
    }).compile();

    breweryService = moduleRef.get<BreweryService>(BreweryService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    handler = moduleRef.get<GetBreweryQueryHandler>(GetBreweryQueryHandler);

    jest.spyOn(prismaService, '$connect').mockResolvedValue();
  });

  it('should return a brewery if one is found from the service', () => {
    // Arrange
    const getSpy = jest.spyOn(breweryService, 'getBrewery');

    // Act
    from(handler.execute(new GetBreweryQuery('1'))).subscribe((response) => {
      // Assert
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(response).not.toBeNull();
      expect(response).not.toBeUndefined();
      expect(response.brewery).not.toBeNull();
      expect(response.brewery).not.toBeUndefined();
    });
  });

  it('should throw a not found error if no brewery is returned from the service', () => {
    // Arrange
    const getSpy = jest
      .spyOn(breweryService, 'getBrewery')
      .mockReturnValue(EMPTY);

    // Act
    from(handler.execute(new GetBreweryQuery('1'))).subscribe({
      error: () => {
        expect(getSpy).toHaveBeenCalledTimes(1);
      },
    });
  });

  // it('should throw a bad request error if ID is unable to be parsed', async () => {});
});
