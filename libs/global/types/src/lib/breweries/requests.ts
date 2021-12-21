import { UpsertAddressRequest } from '../addresses/requests';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';

export class UpsertBreweryRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmptyObject()
  @ValidateNested()
  address: UpsertAddressRequest;

  constructor(private _name: string, private _address: UpsertAddressRequest) {
    this.name = this._name;
    this.address = this._address;
  }
}
