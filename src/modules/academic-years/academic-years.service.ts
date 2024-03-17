import { Injectable } from '@nestjs/common';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { DataFactory } from '@sc-data-factory';
import { AcademicYear } from './entities/academic-year.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AcademicYearsService extends DataFactory<
  AcademicYear,
  CreateAcademicYearDto,
  UpdateAcademicYearDto
> {
  constructor(
    @InjectModel(DB_Model.ACADEMIC_YEAR)
    private academicYearModel: Model<AcademicYear>,
  ) {
    super(academicYearModel);
  }

  async create(createDto: CreateAcademicYearDto): Promise<AcademicYear> {
    await this.academicYearModel.updateMany({}, { $set: { current: false } });
    const academicYear = new this.academicYearModel(createDto);
    return await academicYear.save();
  }

  @Cron('0 0 0 2 * *')
  async handleCron() {
    try {
      const newAcademicYear = new this.academicYearModel();
      await newAcademicYear.save();
      console.log(
        `New Academic Year: ${newAcademicYear.academicYear} added successfully`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
