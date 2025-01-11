import { Injectable } from '@nestjs/common';
import { CreateTeachersEducationDto } from './dto/create-teachers-education.dto';
import { UpdateTeachersEducationDto } from './dto/update-teachers-education.dto';
import { TeachersEducation } from './entities/teachers-education.entity';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource } from 'typeorm';

@Injectable()
export class TeachersEducationService extends BaseRepository<
  TeachersEducation,
  CreateTeachersEducationDto,
  UpdateTeachersEducationDto
> {
  constructor(readonly dataSource: DataSource) {
    super(TeachersEducation, dataSource.createEntityManager());
  }
}
