import { Injectable } from '@nestjs/common';
import { CreateClassSubjectDto } from './dto/create-class-subject.dto';
import { UpdateClassSubjectDto } from './dto/update-class-subject.dto';
import { DataFactory } from '@sc-data-factory';
import { ClassSubject } from './entities/class-subject.entity';
import { DB_Model } from '@sc-enums/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClassSubjectService extends DataFactory<
  ClassSubject,
  CreateClassSubjectDto,
  UpdateClassSubjectDto
> {
  constructor(
    @InjectModel(DB_Model.CLASS_SUBJECT)
    readonly studentModel: Model<ClassSubject>,
  ) {
    super(studentModel, {
      populates: { class: 'className' },
    });
  }
}
