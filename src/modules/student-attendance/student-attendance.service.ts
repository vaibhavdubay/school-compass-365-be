import { Injectable } from '@nestjs/common';
import { CreateStudentAttendanceDto } from './dto/create-student-attendance.dto';
import { UpdateStudentAttendanceDto } from './dto/update-student-attendance.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { StudentAttendance } from './entities/student-attendance.entity';
import {
  Between,
  DataSource,
  FindOptionsWhere,
  MoreThanOrEqual,
} from 'typeorm';
import { UserProfile } from '@sc-decorators/user-profile';
import { Role } from '@sc-enums/role';
import { ATTENDANCE_STATUS } from '@sc-enums/attendanceStatus';

@Injectable()
export class StudentAttendanceService extends BaseRepository<
  StudentAttendance,
  CreateStudentAttendanceDto,
  UpdateStudentAttendanceDto
> {
  constructor(readonly dataSource: DataSource) {
    super(StudentAttendance, dataSource.createEntityManager());
  }

  findAttendance(user: UserProfile, _filter: { [k: string]: string } = {}) {
    const { studentId, classId, type, view, month, year } = _filter;
    const filter: FindOptionsWhere<StudentAttendance> = {
      school: { id: user.school.id },
      academicYear: { id: user.school.currentAcademicYear.id },
    };
    if (classId) filter['class'] = { id: classId };
    if (user.user.role == Role.STUDENT || studentId)
      filter['student'] = { id: studentId || user.user.id };
    switch (type) {
      case 'present':
        filter['attendance'] = ATTENDANCE_STATUS.PRESENT;
        break;
      case 'absent':
        filter['attendance'] = ATTENDANCE_STATUS.ABSENT;
        break;
      case 'late':
        filter['attendance'] = ATTENDANCE_STATUS.LATE;
        break;
      case 'leave':
        filter['attendance'] = ATTENDANCE_STATUS.LEAVE;
        break;
      default:
        break;
    }
    if (view) {
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      switch (view) {
        case 'today':
          filter['createdAt'] = MoreThanOrEqual(today);
          break;
        case 'week':
          const dayOfWeek = today.getDay();
          const weekStart = new Date(
            today.getTime() - dayOfWeek * 24 * 60 * 60 * 1000,
          );
          filter['createdAt'] = MoreThanOrEqual(weekStart);
          break;
        case 'month':
          if (month) {
            const monthStart = new Date(Number(year), Number(month) - 1, 1);
            const monthEnd = new Date(Number(year), Number(month), 0);
            filter['createdAt'] = Between(monthStart, monthEnd);
          } else {
            const monthStart = new Date(
              today.getFullYear(),
              today.getMonth(),
              1,
            );
            filter['createdAt'] = MoreThanOrEqual(monthStart);
          }
          break;
        default:
          break;
      }
    }
    return this.find({
      where: filter,
    });
  }
}
