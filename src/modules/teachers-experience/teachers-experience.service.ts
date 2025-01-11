import { Injectable } from '@nestjs/common';
import { CreateTeachersExperienceDto } from './dto/create-teachers-experience.dto';
import { UpdateTeachersExperienceDto } from './dto/update-teachers-experience.dto';
import { TeachersExperience } from './entities/teachers-experience.entity';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource } from 'typeorm';

@Injectable()
export class TeachersExperienceService extends BaseRepository<
  TeachersExperience,
  CreateTeachersExperienceDto,
  UpdateTeachersExperienceDto
> {
  constructor(readonly dataSource: DataSource) {
    super(TeachersExperience, dataSource.createEntityManager());
  }
}
