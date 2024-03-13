import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateTeacherProfileDto {
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
  @ApiProperty({ example: 'Teacher@12' })
  password: string;
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsArray()
  @IsNotEmpty()
  subjects: string[];
  @IsNumber()
  @IsNotEmpty()
  years_of_experience: number;
}
