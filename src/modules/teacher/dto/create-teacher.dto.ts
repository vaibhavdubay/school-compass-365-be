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
