import { Injectable } from '@nestjs/common';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { DataFactory } from '@sc-data-factory';
import { ClassSchedule } from './entities/class-schedule.entity';
import { DB_Model } from '@sc-enums/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClassScheduleService extends DataFactory<
  ClassSchedule,
  CreateClassScheduleDto,
  UpdateClassScheduleDto
> {
  constructor(
    @InjectModel(DB_Model.CLASS_SCHEDULE)
    readonly studentModel: Model<ClassSchedule>,
  ) {
    super(studentModel, {
      populates: { class: 'className' },
    });
  }
}
