import { CreateAddressRequest } from '../addresses/requests';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBreweryRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmptyObject()
  @ValidateNested()
  address: CreateAddressRequest;

  constructor(private _name: string, private _address: CreateAddressRequest) {
    this.name = this._name;
    this.address = this._address;
  }
}
