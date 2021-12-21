import { IsNotEmpty } from 'class-validator';

export class UpsertAddressRequest {
  @IsNotEmpty()
  streetAddress: string;

  @IsNotEmpty()
  streetAddressExtended: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  zipCode: string;

  zipCodeExtension?: string;

  constructor(
    private _streetAddress: string,
    private _city: string,
    private _state: string,
    private _zipCode: string,
    private _streetAddressExtended: string = '',
    private _zipCodeExtension: string = ''
  ) {
    this.streetAddress = this._streetAddress;
    this.streetAddressExtended = this._streetAddressExtended;
    this.city = this._city;
    this.state = this._state;
    this.zipCode = this._zipCode;
    this.zipCodeExtension = this._zipCodeExtension;
  }
}
