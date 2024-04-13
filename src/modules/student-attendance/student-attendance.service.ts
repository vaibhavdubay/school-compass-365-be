import { Injectable } from '@nestjs/common';
import { CreateStudentAttendanceDto } from './dto/create-student-attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student-attendance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { Model } from 'mongoose';
import { StudentAttendance } from './entities/student-attendance.entity';
import { DataFactory } from '@sc-data-factory';

@Injectable()
export class StudentAttendanceService extends DataFactory<
  StudentAttendance,
  CreateStudentAttendanceDto,
  UpdateStudentAttendanceDto
> {
  constructor(
    @InjectModel(DB_Model.STUDENT_ATTENDANCE)
    readonly attendanceModel: Model<StudentAttendance>,
  ) {
    super(attendanceModel, {
      privileges: [Role.ADMIN, Role.SUPER_ADMIN],
      populates: {
        classId: 'className',
        academicYear: 'academicYear',
        studentId: '',
      },
    });
  }

  createMany(
    attendances: CreateStudentAttendanceDto[],
    config: { schoolId?: string; academicYear?: string } = {},
  ) {
    attendances = attendances.map((attendance) => ({
      ...attendance,
      ...config,
    }));
    return this.attendanceModel.create(attendances);
  }
}
