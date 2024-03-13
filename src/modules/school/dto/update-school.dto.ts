import { PartialType } from '@nestjs/swagger';
import { CreateSchoolDto } from './create-school.dto';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class UpdateSchoolDto extends PartialType(CreateSchoolDto) {
  @IsBoolean()
  @IsNotEmpty()
  autoUpdateStudentClass: boolean;
  @IsString()
  @IsNotEmpty()
  name: string;
  establishedYear: number;
  @IsString()
  @IsNotEmpty()
  address1: string;
  @IsString()
  address2: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  state: string;
  @IsString()
  @IsNotEmpty()
  @IsPostalCode('IN')
  pincode: string;
  @IsString()
  @IsNotEmpty()
  schoolDISECode: string;
  @IsString()
  @IsNotEmpty()
  schoolCode: string;
  @IsArray()
  @IsNotEmpty()
  classes: string[];
}
