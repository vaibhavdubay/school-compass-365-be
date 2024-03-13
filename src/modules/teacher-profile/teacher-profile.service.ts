import { Injectable } from '@nestjs/common';
import { CreateTeacherProfileDto } from './dto/create-teacher-profile.dto';
import { UpdateTeacherProfileDto } from './dto/update-teacher-profile.dto';
import { DataFactory } from '@sc-data-factory';
import { TeacherProfile } from './entities/teacher-profile.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Model } from 'mongoose';
import { Role } from '@sc-enums/role';

@Injectable()
export class TeacherProfileService extends DataFactory<
  TeacherProfile,
  CreateTeacherProfileDto,
  UpdateTeacherProfileDto
> {
  constructor(
    @InjectModel(DB_Model.TEACHER) readonly adminModel: Model<TeacherProfile>,
  ) {
    super(adminModel, { privileges: [Role.ADMIN, Role.SUPER_ADMIN] });
  }
}
