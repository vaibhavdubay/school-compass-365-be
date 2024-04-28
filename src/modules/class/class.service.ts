import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { Class } from './entities/class.entity';
import { DataSource } from 'typeorm';
import { classes } from 'src/core/constant/classes.constant';

@Injectable()
export class ClassService extends BaseRepository<
  Class,
  CreateClassDto,
  UpdateClassDto
> {
  constructor(readonly dataSource: DataSource) {
    super(Class, dataSource.createEntityManager());
    this.createClasses();
  }

  async createClasses() {
    const isAvailable = await this.exists({});
    if (!isAvailable) {
      classes.forEach((_class) => {
        this.save(_class);
      });
    }
  }
}
