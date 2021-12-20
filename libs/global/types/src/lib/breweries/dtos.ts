import { AddressDto } from '../addresses/dtos';

export interface BreweryDto {
  id: number;
  name: string;
  address: AddressDto;
}
