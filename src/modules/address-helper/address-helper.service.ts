import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

export class Address {
  officeName: string;
  pincode: string;
  district: string;
  stateName: string;
}

@Injectable()
export class AddressHelperService {
  addresses: Address[];
  constructor() {
    const addresses = JSON.parse(
      readFileSync(process.cwd() + '/pincode-directory.json', 'utf-8') || '[]',
    );
    this.addresses = addresses.map((d: any) => {
      const officeType = d.OfficeType;
      let officeNameArr: string[] = d.OfficeName.split().filter(
        (n: string) =>
          n.toLowerCase().replace('.', '') !=
          officeType.toLowerCase().replace('.', ''),
      );
      return {
        officeName: officeNameArr.join(''),
        pincode: d.Pincode,
        district: d.District,
        stateName: d.StateName,
      };
    });
  }
  find() {
    return this.addresses;
  }
  findByPin(pin: string) {
    return this.addresses.filter(({ pincode }) => pincode.toString() === pin);
  }
  getPinForAddress(addresses: Partial<Address>) {
    let filteredAddresses: Address[] = this.addresses;
    Object.entries(addresses)
      .filter(([k]) => k in Address)
      .forEach(([k, v]) => {
        filteredAddresses = filteredAddresses.filter(
          (add) => add[k].toLowerCase() == v.toLowerCase(),
        );
      });
    return filteredAddresses;
  }
  getAllPinCodes(startsWith) {
    let pinCodes: string[] = [];
    this.addresses
      .filter(({ pincode }) => pincode.startsWith(startsWith))
      .forEach(({ pincode }) => {
        if (!pinCodes.includes(pincode)) pinCodes.push(pincode);
      });
    return pinCodes;
  }
}
