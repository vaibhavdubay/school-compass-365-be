import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService extends BaseRepository<
  Admin,
  CreateAdminDto,
  UpdateAdminDto
> {
  constructor(readonly dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());
  }
}
