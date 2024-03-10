import { Injectable } from '@nestjs/common';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { DataFactory } from '@sc-data-factory';
import { StudentProfile } from './entities/student-profile.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Model } from 'mongoose';
import { Role } from '@sc-enums/role';

@Injectable()
export class StudentProfileService extends DataFactory<
  StudentProfile,
  CreateStudentProfileDto,
  UpdateStudentProfileDto
> {
  constructor(
    @InjectModel(DB_Model.STUDENT) readonly adminModel: Model<StudentProfile>,
  ) {
    super(adminModel, { priviladges: [Role.ADMIN, Role.SUPERADMIN] });
  }
}
