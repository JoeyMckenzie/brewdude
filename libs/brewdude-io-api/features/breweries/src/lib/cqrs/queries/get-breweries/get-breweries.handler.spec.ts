import { Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { BreweryService } from '../../../services/brewery.service';
import {
  BrewdudeIoApiSharedServicesModule,
  PrismaService,
} from '@brewdude/brewdude-io-api/shared/services';
import { EMPTY, from } from 'rxjs';
import { GetBreweriesQueryHandler } from './get-breweries.handler';
import { GetBreweriesQuery } from './get-breweries.query';

describe(GetBreweriesQueryHandler.name, () => {
  let handler: GetBreweriesQueryHandler;
  let breweryService: BreweryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, BrewdudeIoApiSharedServicesModule],
      providers: [GetBreweriesQueryHandler, BreweryService],
    }).compile();

    breweryService = moduleRef.get<BreweryService>(BreweryService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    handler = moduleRef.get<GetBreweriesQueryHandler>(GetBreweriesQueryHandler);

    jest.spyOn(prismaService, '$connect').mockResolvedValue();
  });

  it('should return a brewery if one is found from the service', () => {
    // Arrange
    const getSpy = jest.spyOn(breweryService, 'getBrewery');

    // Act
    from(handler.execute(new GetBreweriesQuery())).subscribe((response) => {
      // Assert
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(response).not.toBeNull();
      expect(response).not.toBeUndefined();
    });
  });

  it('should throw a not found error if no brewery is returned from the service', () => {
    // Arrange
    const getSpy = jest
      .spyOn(breweryService, 'getBrewery')
      .mockReturnValue(EMPTY);

    // Act
    from(handler.execute(new GetBreweriesQuery())).subscribe({
      error: () => {
        expect(getSpy).toHaveBeenCalledTimes(1);
      },
    });
  });
});
