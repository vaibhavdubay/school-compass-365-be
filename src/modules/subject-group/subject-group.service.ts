import { Injectable } from '@nestjs/common';
import { CreateSubjectGroupDto } from './dto/create-subject-group.dto';
import { UpdateSubjectGroupDto } from './dto/update-subject-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Model } from 'mongoose';
import { SubjectGroup } from './entities/subject-group.entity';
import { DataFactory } from '@sc-data-factory';

@Injectable()
export class SubjectGroupService extends DataFactory<
  SubjectGroup,
  CreateSubjectGroupDto,
  UpdateSubjectGroupDto
> {
  constructor(
    @InjectModel(DB_Model.SUBJECT_GROUP)
    readonly schoolModel: Model<SubjectGroup>,
  ) {
    super(schoolModel);
  }
}
