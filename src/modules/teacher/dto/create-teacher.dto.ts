import { ApiProperty } from '@nestjs/swagger';
import { GENDER } from '@sc-enums/gender';
import { CreateTeachersEducationDto } from '@sc-modules/teachers-education/dto/create-teachers-education.dto';
import { TeachersEducation } from '@sc-modules/teachers-education/entities/teachers-education.entity';
import { CreateTeachersExperienceDto } from '@sc-modules/teachers-experience/dto/create-teachers-experience.dto';
import { TeachersExperience } from '@sc-modules/teachers-experience/entities/teachers-experience.entity';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsEnum,
  IsNumberString,
  IsDateString,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  phoneNumber: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  @ApiProperty({ example: 'Teacher@12' })
  password: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsEnum(GENDER)
  @IsNotEmpty()
  gender: GENDER;

  @IsNotEmpty()
  @IsString()
  address: string;

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

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  aadhar_number: string;

  @IsNotEmpty()
  subjects: string[];

  @IsNumberString()
  @IsNotEmpty()
  years_of_experience: number;

  @IsNotEmpty()
  @Type(() => CreateTeachersEducationDto)
  teachersEducation?: TeachersEducation[];

  @IsNotEmpty()
  @Type(() => CreateTeachersExperienceDto)
  teachersExperience?: TeachersExperience[];

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: string;
}
