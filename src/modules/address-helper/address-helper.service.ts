import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Address, AddressDto, SearchKey } from './dto/address-helper.dto';

@Injectable()
export class AddressHelperService {
  addresses: Address[];
  constructor() {
    const addresses: AddressDto[] = JSON.parse(
      readFileSync(process.cwd() + '/pincode-directory.json', 'utf-8') || '[]',
    );
    this.addresses = addresses.map((d: any) => {
      const officeTypes = ['BO', 'SO', 'PO'];
      const officeNameArr: string[] = d.officename
        .split(' ')
        .filter(
          (n: string) =>
            !officeTypes.includes(n.toUpperCase().replace('.', '')),
        );
      return {
        town: officeNameArr.join(''),
        pincode: d.pincode,
        district: d.district,
        stateName: d.statename,
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
  getDetails(key: SearchKey, startsWith: string, queryParem: Address = {}) {
    const response: string[] = [];
    const parems = Object.entries(queryParem);
    this.addresses
      .filter(
        (d) =>
          d[key].toLowerCase()?.startsWith(startsWith?.toLowerCase() || '') &&
          (parems.length == 0 ||
            parems.every(([k, v]) => d[k].toLowerCase() == v.toLowerCase())),
      )
      .forEach((d) => {
        if (!response.includes(d[key])) response.push(d[key]);
      });
    return response.sort();
  }
}
