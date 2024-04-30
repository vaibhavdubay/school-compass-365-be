import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

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
