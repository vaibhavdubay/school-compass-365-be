import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsArray,
  IsEmail,
  IsPhoneNumber,
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

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsInt()
  pincode: number;

  @IsNotEmpty()
  @IsString()
  schoolDISECode: string;

  @IsNotEmpty()
  @IsString()
  schoolCode: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
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
