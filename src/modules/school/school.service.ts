import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource } from 'typeorm';
import { School } from './entities/school.entity';

@Injectable()
export class SchoolService extends BaseRepository<
  School,
  CreateSchoolDto,
  UpdateSchoolDto
> {
  constructor(readonly dataSource: DataSource) {
    super(School, dataSource.createEntityManager());
  }
}
