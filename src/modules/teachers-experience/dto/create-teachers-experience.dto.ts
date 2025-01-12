import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTeachersExperienceDto {
  @IsUUID()
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
