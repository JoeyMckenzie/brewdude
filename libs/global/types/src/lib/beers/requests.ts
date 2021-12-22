import { BeerStyle } from './enums';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateBeerRequest {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @Max(1)
  @Min(0)
  abv?: number;

  @IsNotEmpty()
  @Max(1000)
  @Min(0)
  ibu?: number;

  @IsNotEmpty()
  breweryId?: string;

  beerStyle?: BeerStyle;
}
