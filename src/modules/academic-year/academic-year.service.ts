import { Injectable } from '@nestjs/common';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource } from 'typeorm';
import { AcademicYear } from './entities/academic-year.entity';

@Injectable()
export class AcademicYearService extends BaseRepository<
  AcademicYear,
  CreateAcademicYearDto,
  UpdateAcademicYearDto
> {
  constructor(readonly dataSource: DataSource) {
    super(AcademicYear, dataSource.createEntityManager());
  }
}
