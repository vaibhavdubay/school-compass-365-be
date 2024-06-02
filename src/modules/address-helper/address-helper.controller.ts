import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { Address, AddressHelperService } from './address-helper.service';
import { ApiQuery, PartialType } from '@nestjs/swagger';

@Controller('address-helper')
export class AddressHelperController {
  constructor(private readonly addressHelperService: AddressHelperService) {}

  @Get()
  findAll() {
    return this.addressHelperService.find();
  }

  @Get('getByAddress')
  @ApiQuery({
    type: PartialType<Address>,
  })
  getByAddress() {}
  @Get('getPinCodes')
  getAllPinCodes(@Query('startWith') startsWith: string) {
    return this.addressHelperService.getAllPinCodes(startsWith);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressHelperService.findByPin(id);
  }
}
