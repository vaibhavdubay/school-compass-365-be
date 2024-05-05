import { ATTENDANCE_STATUS } from '@sc-enums/attendanceStatus';

export class CreateStudentAttendanceDto {
  studentId: string;
  classId: string;
  classScheduleId?: string;
  attendance: ATTENDANCE_STATUS;
}
