import {
  BreweryResponse,
  UpsertAddressRequest,
  UpsertBreweryRequest,
} from '@brewdude/global/types';
import { Test } from '@nestjs/testing';
import { BreweriesController } from './breweries.controller';
import { handlers } from './cqrs';
import { CqrsModule, CommandBus, QueryBus } from '@nestjs/cqrs';
import { BrewdudeIoApiSharedServicesModule } from '@brewdude/brewdude-io-api/shared/services';
import { BreweryService } from './services/brewery.service';

describe(BreweriesController.name, () => {
  let controller: BreweriesController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, BrewdudeIoApiSharedServicesModule],
      controllers: [BreweriesController],
      providers: [...handlers, BreweryService],
    }).compile();

    controller = moduleRef.get<BreweriesController>(BreweriesController);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
    queryBus = moduleRef.get<QueryBus>(QueryBus);
  });

  describe('creating a brewery', () => {
    it('should return a brewery upon successful creation', () => {
      // Arrange
      jest.spyOn(commandBus, 'execute').mockResolvedValue({
        brewery: {
          id: '1',
          name: 'Fall River Brewery',
        },
      } as BreweryResponse);

      const addressRequest = new UpsertAddressRequest(
        '1707 Whistling Dr.',
        'Redding',
        'CA',
        '96003'
      );

      const breweryRequest = new UpsertBreweryRequest(
        'Fall River Brewery',
        addressRequest
      );

      // Act
      controller.createBrewery(breweryRequest).subscribe((response) => {
        expect(response).not.toBeUndefined();
        expect(response).not.toBeNull();
        expect(response.brewery).not.toBeUndefined();
        expect(response.brewery).not.toBeUndefined();
        expect(response.brewery.id).toBe(1);
        expect(response.brewery.name).toBe('Fall River Brewery');
      });
    });
  });
});
