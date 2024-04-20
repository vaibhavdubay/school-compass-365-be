import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Role } from '@sc-enums/role';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
