import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataFactory } from '@sc-data-factory';
import { DB_Model } from '@sc-enums/model';
import { Model } from 'mongoose';
import { SchoolProfile } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { User } from '@sc-decorators/user';
import { StudentProfile } from '@sc-modules/student-profile/entities/student-profile.entity';
import {
  lookupClass,
  matchStudentStage,
  mergeStudentsStage,
  nextClassProjection,
  setStudentFieldsStage,
  completeSchoolInformationProjection,
} from '@sc-constants/school';
import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';

@Injectable()
export class SchoolService extends DataFactory<
  SchoolProfile,
  CreateSchoolDto,
  UpdateSchoolDto
> {
  constructor(
    @InjectModel(DB_Model.SCHOOL) readonly schoolModel: Model<SchoolProfile>,
    @InjectModel(DB_Model.STUDENT) readonly studentModel: Model<StudentProfile>,
  ) {
    super(schoolModel, {
      compare_key: 'schoolId',
      populates: { classes: 'className' },
    });
  }

  findAll(): Promise<SchoolProfile[]> {
    return this.schoolModel.aggregate([
      ...this.addLookUps([{ model: DB_Model.ADMIN, foreignKey: 'schoolId' }]),
    ]);
  }

  async getCompleteSchoolDetails(user: User) {
    const lookups = this.addLookUps([
      {
        model: DB_Model.STUDENT,
        foreignKey: 'schoolId',
        pipeLine: [
          { $match: { academicStatus: ACADEMIC_STATUS.ACTIVE } }, // Filter students based on isActive field
        ],
      },
      { model: DB_Model.TEACHER, foreignKey: 'schoolId' },
    ]);

    return await this.schoolModel.aggregate([
      {
        $match: { _id: user.schoolId },
      },
      ...lookups,
      completeSchoolInformationProjection,
    ]);
  }

  async completeAcademicYear(schoolId: string) {
    try {
      await this.studentModel
        .aggregate([
          matchStudentStage(schoolId),
          ...this.addLookUps([
            {
              model: DB_Model.SCHOOL,
              localField: 'schoolId',
            },
          ]),
          lookupClass('class', 'class'),
          lookupClass('class.nextClass', 'nextClass'),
          setStudentFieldsStage,
          nextClassProjection,
          mergeStudentsStage,
        ])
        .exec();
      return {
        message:
          'The Academy Year and student records are updated successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
