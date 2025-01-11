import { PartialType } from '@nestjs/mapped-types';
import { CreateTeachersEducationDto } from './create-teachers-education.dto';

export class UpdateTeachersEducationDto extends PartialType(
  CreateTeachersEducationDto,
) {}
