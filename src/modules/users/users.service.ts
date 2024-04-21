import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { AdminService } from '@sc-modules/admin/admin.service';
import { StudentService } from '@sc-modules/student/student.service';
import { TeacherService } from '@sc-modules/teacher/teacher.service';

@Injectable()
export class UsersService extends BaseRepository<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
