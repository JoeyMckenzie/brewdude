import { BreweryDto } from './dtos';

export interface BreweryResponse {
  brewery: BreweryDto;
}

export interface BreweryListResponse {
  breweries: BreweryDto[];
}
