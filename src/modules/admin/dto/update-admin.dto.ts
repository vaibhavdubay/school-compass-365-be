import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { Role } from '@sc-enums/role';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsString()
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
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  password: string;
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
  @IsString()
  @IsNotEmpty()
  userName: string;
}
