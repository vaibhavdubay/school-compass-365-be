import { Injectable } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { Model } from 'mongoose';
import { DB_Model } from '@sc-enums/model';
import { InjectModel } from '@nestjs/mongoose';
import { DataFactory } from '@sc-data-factory';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService extends DataFactory<
  Admin,
  CreateAdminDto,
  UpdateAdminDto
> {
  constructor(@InjectModel(DB_Model.ADMIN) adminModel: Model<Admin>) {
    super(adminModel, { populates: { profileImage: 'url updatedAt' } });
  }
}
