import { ApiProperty } from '@nestjs/swagger';
import { GENDER } from '@sc-enums/gender';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEnum(GENDER)
  @IsNotEmpty()
  gender: GENDER;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsPhoneNumber('IN')
  phoneNumber: string;
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: string;
}
