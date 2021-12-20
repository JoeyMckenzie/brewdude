import { Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { handlers } from '../..';
import { BreweryService } from '../../../services/brewery.service';
import { CreateBreweryCommandHandler } from './create-brewery.handler';
import { BrewdudeIoApiSharedServicesModule } from '@brewdude/brewdude-io-api/shared/services';
import { EMPTY, from, of } from 'rxjs';
import {
  CreateAddressRequest,
  CreateBreweryRequest,
} from '@brewdude/global/types';
import { CreateBreweryCommand } from './create-brewery.command';

describe(CreateBreweryCommandHandler.name, () => {
  let handler: CreateBreweryCommandHandler;
  let breweryService: BreweryService;

  const addressRequest = new CreateAddressRequest(
    'mock street address',
    'mock city',
    'mock state',
    'mock zip code'
  );

  const breweryRequest = new CreateBreweryRequest(
    'mock brewery',
    addressRequest
  );

  const command = new CreateBreweryCommand(breweryRequest);

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, BrewdudeIoApiSharedServicesModule],
      providers: [...handlers, BreweryService],
    }).compile();

    breweryService = moduleRef.get<BreweryService>(BreweryService);
    handler = moduleRef.get<CreateBreweryCommandHandler>(
      CreateBreweryCommandHandler
    );
  });

  it('should return a brewery upon successful creation', () => {
    // Arrange
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
