import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTeachersExperienceDto {
  @IsUUID()
  @IsNotEmpty()
  teacherId: string;

  @IsString()
  @IsNotEmpty()
  institute: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsBoolean()
  currentlyTeaching: boolean;
}
