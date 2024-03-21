import { DAYS } from '@sc-enums/days';
import { IsEnum, IsMongoId, IsString } from 'class-validator';

export class CreateClassScheduleDto {
  @IsMongoId()
  class: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsEnum(DAYS)
  day: DAYS;

  @IsString()
  room: string;

  @IsMongoId()
  subject: string;
}
