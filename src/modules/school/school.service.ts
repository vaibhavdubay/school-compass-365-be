import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource } from 'typeorm';
import { School } from './entities/school.entity';
import { AdminService } from '@sc-modules/admin/admin.service';

@Injectable()
export class SchoolService extends BaseRepository<
  School,
  CreateSchoolDto,
  UpdateSchoolDto
> {
  constructor(
    readonly dataSource: DataSource,
    readonly adminService: AdminService,
  ) {
    super(School, dataSource.createEntityManager());
  }

  createSchoolProfile(createDto: CreateSchoolDto) {
    console.log(createDto);
  }
}
