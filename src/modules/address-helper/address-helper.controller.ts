import { Controller, Get, Param, Query } from '@nestjs/common';
import { AddressHelperService } from './address-helper.service';
import { Address, SearchKey } from './dto/address-helper.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { Auth } from '@sc-decorators/auth';

@Controller('address-helper')
@Auth('all')
export class AddressHelperController {
  constructor(private readonly addressHelperService: AddressHelperService) {}

  @Get()
  getByAddress(@Query() address: Address) {
    return this.addressHelperService.getPinForAddress(address);
  }

  @Get(':key')
  @ApiQuery({
    name: 'startsWith',
    required: false,
  })
  @ApiQuery({
    name: 'searchParems',
    required: false,
    type: Address,
  })
  @ApiParam({
    name: 'key',
    enum: SearchKey,
    required: true,
  })
  getAllPinCodes(@Param('key') key: SearchKey, @Query() query: any) {
    const { startsWith, ...parems } = query;
    return this.addressHelperService.getDetails(key, startsWith, parems);
  }
}
