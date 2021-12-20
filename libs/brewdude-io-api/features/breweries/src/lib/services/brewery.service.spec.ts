import { Test } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import {
  BrewdudeIoApiSharedServicesModule,
  PrismaService,
} from '@brewdude/brewdude-io-api/shared/services';
import { BreweryService } from './brewery.service';
import {
  CreateAddressRequest,
  CreateBreweryRequest,
} from '@brewdude/global/types';

describe(BreweryService.name, () => {
  let service: BreweryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CqrsModule, BrewdudeIoApiSharedServicesModule],
      providers: [BreweryService],
    }).compile();

    service = moduleRef.get<BreweryService>(BreweryService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('creating a brewery', () => {
    const addressRequest = new CreateAddressRequest(
      'mock street address',
      'mock city',
      'mock state',
      'mock zip code'
    );

    const breweryRequest = new CreateBreweryRequest(
      'Fall River Brewery',
      addressRequest
    );

    it('should return a brewery upon successful creation', () => {
      // Arrange
      const prismaCreateSpy = jest
        .spyOn(prismaService.brewery, 'create')
        .mockResolvedValue({
          id: 1,
          addressId: 1,
          name: 'mock brewery',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const prismaFindFirstSpy = jest
        .spyOn(prismaService.address, 'findFirst')
        .mockResolvedValue({
          id: 1,
          streetAddress: 'mock address',
          city: 'mock city',
          state: 'mock state',
          zipCode: 'mock zip code',
          createdAt: new Date(),
          updatedAt: new Date(),
          streetAddressExtended: '',
          zipCodeExtension: '',
        });

      // Act
      service
        .createBrewery(breweryRequest, new Date())
        .subscribe((response) => {
          // Assert
          expect(prismaCreateSpy).toHaveBeenCalledTimes(1);
          expect(prismaFindFirstSpy).toHaveBeenCalledTimes(1);
          expect(response).not.toBeNull();
          expect(response).not.toBeUndefined();
        });
    });

    it('should return empty if an error occurs during creation', () => {
      // Arrange
      const prismaCreateSpy = jest
        .spyOn(prismaService.brewery, 'create')
        .mockRejectedValue('Error');

      const prismaFindFirstSpy = jest.spyOn(prismaService.address, 'findFirst');

      // Act
      service
        .createBrewery(breweryRequest, new Date())
        .subscribe((response) => {
          // Assert
          expect(prismaCreateSpy).toHaveBeenCalledTimes(1);
          expect(prismaFindFirstSpy).not.toHaveBeenCalled();
          expect(response).toBeUndefined();
        });
    });
  });

  describe('retrieving a brewery', () => {
    it('should return a brewery if the brewery is found', () => {
      // Arrange
      const prismaFindFirstSpy = jest
        .spyOn(prismaService.brewery, 'findFirst')
        .mockResolvedValue({
          id: 1,
          name: 'mock brewery',
          addressId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      // Act
      service.getBrewery(1).subscribe((response) => {
        // Assert
        expect(prismaFindFirstSpy).toHaveBeenCalledTimes(1);
        expect(response).not.toBeNull();
        expect(response).not.toBeUndefined();
      });
    });

    it('should return empty if no brewery is found', () => {
      // Arrange
      const prismaFindFirstSpy = jest
        .spyOn(prismaService.brewery, 'findFirst')
        .mockResolvedValue(null);

      // Act
      service.getBrewery(1).subscribe((response) => {
        // Assert
        expect(prismaFindFirstSpy).toHaveBeenCalledTimes(1);
        expect(response).toBeUndefined();
      });
    });

    it('should return empty if an error occurs during retrieval', () => {
      // Arrange
      const prismaFindFirstSpy = jest
        .spyOn(prismaService.brewery, 'findFirst')
        .mockRejectedValue('Error');

      // Act
      service.getBrewery(1).subscribe((response) => {
        // Assert
        expect(prismaFindFirstSpy).toHaveBeenCalledTimes(1);
        expect(response).toBeUndefined();
      });
    });
  });
});
