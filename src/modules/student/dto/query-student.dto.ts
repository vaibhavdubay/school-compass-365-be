import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class QueryStudent {
  @IsNotEmpty()
  @IsString()
  classId?: string;

  @IsString()
  classSection?: string = '';

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  pen?: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth?: Date;
}
