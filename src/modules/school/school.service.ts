import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataFactory } from '@sc-data-factory';
import { DB_Model } from '@sc-enums/model';
import { Model } from 'mongoose';
import { SchoolProfile } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService extends DataFactory<
  SchoolProfile,
  CreateSchoolDto,
  UpdateSchoolDto
> {
  constructor(
    @InjectModel(DB_Model.SCHOOL) readonly schoolModel: Model<SchoolProfile>,
  ) {
    super(schoolModel, 'schoolId');
  }
}
