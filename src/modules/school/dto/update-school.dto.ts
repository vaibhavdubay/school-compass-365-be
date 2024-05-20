import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  IsNumberString,
} from 'class-validator';

export class UpdateSchoolDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsNotEmpty()
  @IsString()
  town: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsNumberString()
  pincode: number;

  @IsNotEmpty()
  @IsString()
  schoolDISECode: string;

  @IsNotEmpty()
  @IsString()
  schoolCode: string;

  @IsNotEmpty()
  classes: string[];

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: string;
}
