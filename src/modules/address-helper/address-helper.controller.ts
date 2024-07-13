import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AddressHelperService } from './address-helper.service';
import { Address } from './dto/address-helper.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('address-helper')
export class AddressHelperController {
  constructor(private readonly addressHelperService: AddressHelperService) { }

  @Get()
  getByAddress(@Query() address: Address) {
    return this.addressHelperService.getPinForAddress(address)
  }

  @Get(':key')
  @ApiQuery({
    "name": "startsWith",
    "required": false
  })
  getAllPinCodes(@Param('key') key: string, @Query('startsWith') startsWith: string) {
    return this.addressHelperService.getDetails(key, startsWith);
  }
}
