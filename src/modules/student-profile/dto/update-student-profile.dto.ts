import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentProfileDto } from './create-student-profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import { Parents_Guardians } from './parent-guardians.dto';

export class UpdateStudentProfileDto extends PartialType(
  CreateStudentProfileDto,
) {
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
  @ApiProperty({ example: 'Student@12' })
  password: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  pen: string;

  @IsMongoId()
  class: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsEnum(GENDER)
  @ApiProperty({ example: 'Male', enum: GENDER })
  gender: GENDER;

  @IsEnum(BLOOD_GROUP)
  @ApiProperty({ example: 'A+', enum: BLOOD_GROUP })
  BLOOD_GROUP: BLOOD_GROUP;

  @IsArray()
  @IsNotEmpty()
  parents_guardians: Parents_Guardians[];

  @ApiProperty({ type: 'string', format: 'binary' })
  profileImage: string;
}
