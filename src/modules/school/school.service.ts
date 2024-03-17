import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataFactory } from '@sc-data-factory';
import { DB_Model } from '@sc-enums/model';
import mongoose, { Model } from 'mongoose';
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
  updateAcademicYear,
} from '@sc-constants/school';
import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';
import { AcademicYear } from '@sc-modules/academic-years/entities/academic-year.entity';
import { Observable } from 'rxjs';
import { MessageEvent } from './school.controller';

type Messenger = (m: string, p?: boolean, c?: boolean) => void;

@Injectable()
export class SchoolService extends DataFactory<
  SchoolProfile,
  CreateSchoolDto,
  UpdateSchoolDto
> {
  constructor(
    @InjectModel(DB_Model.SCHOOL) readonly schoolModel: Model<SchoolProfile>,
    @InjectModel(DB_Model.STUDENT) readonly studentModel: Model<StudentProfile>,
    @InjectModel(DB_Model.ACADEMIC_YEAR)
    readonly academicYearsModel: Model<AcademicYear>,
  ) {
    super(schoolModel, {
      compare_key: 'schoolId',
      populates: { classes: 'className', academicYears: 'academicYear' },
    });
  }

  findAll(): Promise<SchoolProfile[]> {
    return this.schoolModel.aggregate([
      ...this.addLookUps([
        { model: DB_Model.ADMIN, foreignKey: 'schoolId', alias: 'admin' },
      ]),
      { $unwind: '$admin' },
    ]);
  }

  async create(createDto: CreateSchoolDto): Promise<SchoolProfile> {
    createDto['academicYears'] = [createDto['currentAcademicYear']];
    const user = new this.schoolModel(createDto);
    return await user.save();
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

  completeAcademicYear$(school: SchoolProfile & { _id: string }) {
    return new Observable<MessageEvent>((observer) => {
      const sentMessage = (
        message: string,
        processing = true,
        completed = false,
      ) => {
        observer.next({
          data: {
            message,
            processing,
            completed,
          },
        });
        observer.complete();
      };
      sentMessage('Fetching latest academic year details.');
      try {
        this.academicYearsModel
          .findOne({
            current: true,
            _id: {
              $ne: school.currentAcademicYear,
            },
          })
          .then(async (data) => {
            if (!data)
              return sentMessage(
                'School academic year is already updated.',
                false,
                true,
              );
            const currentAcademicYear = data._id;
            sentMessage(
              `Found current academic year as ${data.academicYear}.`,
              false,
            );
            await this.updateAcademicYear(
              sentMessage,
              currentAcademicYear,
              school._id,
            );
          });
      } catch (error) {
        throw error;
      }
    });
  }

  private async updateAcademicYear(
    sentMessage: Messenger,
    currentAcademicYear: mongoose.Types.ObjectId,
    schoolId: string,
  ) {
    await this.updateSchoolProfile(sentMessage, currentAcademicYear, schoolId);
    await this.updateStudentProfiles(
      sentMessage,
      currentAcademicYear,
      schoolId,
    );
  }

  private async updateSchoolProfile(
    sentMessage: Messenger,
    currentAcademicYear: mongoose.Types.ObjectId,
    schoolId: string,
  ) {
    sentMessage(`Updating school academic year details.`);
    await this.schoolModel.findOneAndUpdate(
      { _id: schoolId },
      {
        $set: {
          currentAcademicYear,
        },
        $push: { academicYears: currentAcademicYear },
      },
      { new: true },
    );
    sentMessage('School academic year updated.', false);
  }
  private async updateStudentProfiles(
    sentMessage: Messenger,
    currentAcademicYear: mongoose.Types.ObjectId,
    schoolId: string,
  ): Promise<void> {
    sentMessage("Updating student profile information's.");
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
        updateAcademicYear(currentAcademicYear),
        nextClassProjection,
        mergeStudentsStage,
      ])
      .exec();
    sentMessage('Student profile information updated.', false, true);
  }
}
