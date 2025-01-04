export class Address {
  town?: string;
  pincode?: string;
  district?: string;
  stateName?: string;
}

export class AddressDto {  
  Pincode: string;
  District: string;
  StateName: string;
  OfficeName: string;
}

export enum SearchKey {
  PINCODE = 'pincode',
  DISTRICT = 'district',
  STATE_NAME = 'stateName',
  TOWN = 'town'
}