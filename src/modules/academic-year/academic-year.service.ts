import { Injectable } from '@nestjs/common';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource } from 'typeorm';
import { AcademicYear } from './entities/academic-year.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AcademicYearService extends BaseRepository<
  AcademicYear,
  CreateAcademicYearDto,
  UpdateAcademicYearDto
> {
  constructor(readonly dataSource: DataSource) {
    super(AcademicYear, dataSource.createEntityManager());
  }

  async createAcademicYear() {
    await this.update({}, { current: false });
    return this.save({});
  }

  @Cron('0 0 0 2 * *')
  async handleCron() {
    try {
      const newAcademicYear = await this.createAcademicYear();
      console.log(
        `New Academic Year: ${newAcademicYear.academicYear} added successfully`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
