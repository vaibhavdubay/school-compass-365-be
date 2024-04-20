import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { Teacher } from './entities/teacher.entity';
import { DataSource } from 'typeorm';
import { Role } from '@sc-enums/role';
import { User } from '@sc-modules/users/entities/user.entity';

@Injectable()
export class TeacherService extends BaseRepository<
  Teacher,
  CreateTeacherDto,
  UpdateTeacherDto
> {
  constructor(readonly dataSource: DataSource) {
    super(Teacher, dataSource.createEntityManager());
  }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { email, password, firstName, lastName, userName, phoneNumber } =
      createTeacherDto;
    const user: Partial<User> = {
      email,
      password,
      name: `${firstName} ${lastName}`,
      userName,
      role: Role.TEACHER,
    };
    const teacher: Partial<Teacher> = {
      firstName,
      lastName,
      email,
      phoneNumber,
      user: user as User,
    };
    return await this.createDocument(teacher);
  }
}
