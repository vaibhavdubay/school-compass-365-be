import { PartialType } from '@nestjs/mapped-types';
import { CreateTeachersExperienceDto } from './create-teachers-experience.dto';

export class UpdateTeachersExperienceDto extends PartialType(
  CreateTeachersExperienceDto,
) {}
