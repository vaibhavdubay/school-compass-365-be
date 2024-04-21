import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { Class } from './entities/class.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ClassService extends BaseRepository<
  Class,
  CreateClassDto,
  UpdateClassDto
> {
  constructor(readonly dataSource: DataSource) {
    super(Class, dataSource.createEntityManager());
  }
}
