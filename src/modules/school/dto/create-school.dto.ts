import { GENDER } from '@sc-enums/gender';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateSchoolDto {
  @IsNotEmpty()
  @IsString()
  schoolName: string;

  @IsNotEmpty()
  @IsInt()
  establishedYear: number;

  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsNotEmpty()
  @IsString()
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
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(6, 8)
  password: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;
}
