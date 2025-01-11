import { IsUUID, IsNotEmpty, IsString, IsDecimal } from 'class-validator';

export class CreateTeachersEducationDto {
  @IsUUID()
  @IsNotEmpty()
  teacherId: string;

  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  fieldOfStudy: string;

  @IsString()
  @IsNotEmpty()
  passingYear: string;

  @IsString()
  @IsDecimal()
  @IsNotEmpty()
  gpa: string;
}
