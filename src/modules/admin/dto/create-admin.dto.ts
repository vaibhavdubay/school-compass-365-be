import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class CreateAdminDto {
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
  @ApiProperty({ example: 'admin@mail.com' })
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IN')
  @ApiProperty({ example: '9876543210' })
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
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
  @ApiProperty({ example: 'admin' })
  userName: string;
}
