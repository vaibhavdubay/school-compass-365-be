import { ApiProperty } from '@nestjs/swagger';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Parents_Guardians } from './parent-guardians.dto';

export class CreateStudentProfileDto {
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
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  @ApiProperty({ example: 'Student@12' })
  password: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  pen: string;

  @IsString()
  class: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'male', enum: GENDER })
  gender: GENDER;

  @IsString()
  @ApiProperty({ example: 'A+', enum: BLOOD_GROUP })
  BLOOD_GROUP: BLOOD_GROUP;

  @IsArray()
  @IsNotEmpty()
  parents_guardians: Parents_Guardians[];
}
