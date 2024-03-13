import { PartialType } from '@nestjs/swagger';
import { UpdateSchoolDto } from './update-school.dto';

export class CompleteSchoolObject extends PartialType(UpdateSchoolDto) {
  'students': number;
  'teachers': number;
}
