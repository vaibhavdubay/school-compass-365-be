import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { DataFactory } from '@sc-data-factory';
import { Class } from './entities/class.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Model } from 'mongoose';

@Injectable()
export class ClassService extends DataFactory<
  Class,
  CreateClassDto,
  UpdateClassDto
> {
  constructor(
    @InjectModel(DB_Model.CLASS)
    readonly classModel: Model<Class>,
  ) {
    super(classModel);
  }
}
