import { Module } from '@nestjs/common';
import { AddressHelperService } from './address-helper.service';
import { AddressHelperController } from './address-helper.controller';

@Module({
  controllers: [AddressHelperController],
  providers: [AddressHelperService],
})
export class AddressHelperModule {}
