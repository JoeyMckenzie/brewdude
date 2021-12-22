import { AddressDto } from '../addresses/dtos';

export interface BreweryDto {
  id: string;
  name: string;
  address: AddressDto;
}
