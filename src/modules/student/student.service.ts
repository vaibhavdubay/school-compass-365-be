import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { Student } from './entities/student.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class StudentService extends BaseRepository<
  Student,
  CreateStudentDto,
  UpdateStudentDto
> {
  constructor(readonly dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }
}
