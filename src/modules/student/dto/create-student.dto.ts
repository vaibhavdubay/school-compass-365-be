import { ApiProperty } from '@nestjs/swagger';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import { ParentOrGuardian } from '@sc-modules/parent-or-guardians/entities/parent-or-guardian.entity';
import {
  IsNotEmpty,
  IsStrongPassword,
  Length,
  IsString,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
  IsDateString,
  IsArray,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  classId: string;

  @IsString()
  classSection: string = '';

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
  @IsString()
  pen: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsEnum(GENDER)
  gender: GENDER;

  @IsNotEmpty()
  @IsEnum(BLOOD_GROUP)
  bloodGroup: BLOOD_GROUP;

  @IsArray({ each: true })
  @IsNotEmpty()
  parentsGuardians: ParentOrGuardian[];

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: string;
}
