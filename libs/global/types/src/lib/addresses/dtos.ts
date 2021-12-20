export interface AddressDto {
  id?: number;
  streetAddress: string;
  streetAddressExtended: string;
  city: string;
  state: string;
  zipCode: string;
  zipCodeExtension?: string;
}
