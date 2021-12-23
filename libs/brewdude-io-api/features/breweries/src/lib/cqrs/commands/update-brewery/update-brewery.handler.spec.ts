import { Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { BreweryService } from '../../../services/brewery.service';
import { UpdateBreweryCommandHandler } from './update-brewery.handler';
import {
  BrewdudeIoApiSharedServicesModule,
  PrismaService,
} from '@brewdude/brewdude-io-api/shared/services';
import { EMPTY, from, of } from 'rxjs';
import {
  UpsertAddressRequest,
  UpsertBreweryRequest,
} from '@brewdude/global/types';
import { UpdateBreweryCommand } from './update-brewery.command';

describe(UpdateBreweryCommandHandler.name, () => {
  let handler: UpdateBreweryCommandHandler;
  let breweryService: BreweryService;

  const addressRequest = new UpsertAddressRequest(
    'mock street address',
    'mock city',
    'mock state',
    'mock zip code'
  );

  const breweryRequest = new UpsertBreweryRequest(
    'mock brewery',
    addressRequest
  );

  const command = new UpdateBreweryCommand('1', breweryRequest);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, BrewdudeIoApiSharedServicesModule],
      providers: [UpdateBreweryCommandHandler, BreweryService],
    }).compile();

    breweryService = moduleRef.get<BreweryService>(BreweryService);
    handler = moduleRef.get<UpdateBreweryCommandHandler>(
      UpdateBreweryCommandHandler
    );

    jest
      .spyOn(moduleRef.get<PrismaService>(PrismaService), '$connect')
      .mockResolvedValue();
  });

  it('should return a brewery upon successful update', () => {
    // Arrange
    const peekSpy = jest
      .spyOn(breweryService, 'peekBrewery')
      .mockReturnValue(of());

    const createSpy = jest
      .spyOn(breweryService, 'createBrewery')
      .mockReturnValue(of());

    // Act
    from(handler.execute(command)).subscribe((response) => {
      // Assert
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(response).not.toBeNull();
      expect(response).not.toBeUndefined();
      expect(response.brewery).not.toBeNull();
      expect(response.brewery).not.toBeUndefined();
    });
  });

  it('should throw an internal server error if no brewery is returned from the service', () => {
    // Arrange
    const createSpy = jest
      .spyOn(breweryService, 'createBrewery')
      .mockReturnValue(EMPTY);

    // Act
    from(handler.execute(command)).subscribe((response) => {
      // Assert
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(response).toBeNull();
      expect(response).toBeUndefined();
    });
  });
});
