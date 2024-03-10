import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherProfileDto } from './create-teacher-profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class UpdateTeacherProfileDto extends PartialType(
  CreateTeacherProfileDto,
) {
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
