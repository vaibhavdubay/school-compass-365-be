import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsPhoneNumber,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsMongoId()
  @IsNotEmpty()
  schoolId: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IN')
  phoneNumber: string;
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  @ApiProperty({ example: 'Admin@12' })
  password: string;
  @IsString()
  @IsNotEmpty()
  userName: string;
}
