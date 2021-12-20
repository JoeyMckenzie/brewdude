import { BeerStyle } from './enums';
import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateBeerRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Max(1)
  @Min(0)
  abv: number;

  @IsNotEmpty()
  @Max(1000)
  @Min(0)
  ibu: number;
  breweryId: number;

  beerStyle: BeerStyle;

  constructor(
    private _name: string,
    private _abv: number,
    private _ibu: number,
    private _breweryId: number,
    private _beerStyle: BeerStyle
  ) {
    this.name = this._name;
    this.abv = this._abv;
    this.ibu = this._ibu;
    this.breweryId = this._breweryId;
    this.beerStyle = this._beerStyle;
  }
}
