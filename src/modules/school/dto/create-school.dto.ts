import { IsString, IsPostalCode, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateSchoolDto {
  @IsBoolean()
  @IsNotEmpty()
  autoUpdateStudentClass: boolean;
  @IsNotEmpty()
  name: string;
  establishedYear: number = new Date().getFullYear();
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
  schoolDISECode: string;
  @IsString()
  schoolCode: string;
  @IsString()
  @IsNotEmpty()
  currentAcademicYear: string;
}
