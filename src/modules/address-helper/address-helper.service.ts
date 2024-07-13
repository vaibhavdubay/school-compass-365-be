import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Address, AddressDto } from './dto/address-helper.dto';

@Injectable()
export class AddressHelperService {
  addresses: Address[];
  constructor() {
    const addresses: AddressDto[] = JSON.parse(
      readFileSync(process.cwd() + '/pincode-directory.json', 'utf-8') || '[]',
    );
    this.addresses = addresses.map((d: any) => {
      const officeTypes = ['BO', 'SO', 'PO'];
      const officeNameArr: string[] = d.OfficeName.split(' ').filter(
        (n: string) => !officeTypes.includes(n.toUpperCase().replace('.', '')),
      );
      return {
        town: officeNameArr.join(''),
        pincode: d.Pincode,
        district: d.District,
        stateName: d.StateName,
      };
    });
  }

  getPinForAddress(addresses: Address) {
    let filteredAddresses: Address[] = this.addresses;
    Object.entries(addresses).forEach(([k, v]) => {
      filteredAddresses = filteredAddresses.filter(
        (add) => add[k].toLowerCase() == v.toLowerCase(),
      );
    });
    return filteredAddresses;
  }
  getDetails(key: string, startsWith: string) {
    const response: string[] = [];
    this.addresses
      .filter((d) => d[key]?.startsWith(startsWith || ''))
      .forEach((d) => {
        if (!response.includes(d[key])) response.push(d[key]);
      });
    return response;
  }
}
