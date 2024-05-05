import { ApiProperty } from '@nestjs/swagger';
import { ATTENDANCE_STATUS } from '@sc-enums/attendanceStatus';

export class QueryStudentAttendance {
  @ApiProperty({ required: false })
  studentId: string;
  @ApiProperty({ required: false })
  classId: string;
  @ApiProperty({ required: false })
  type: ATTENDANCE_STATUS;
  @ApiProperty({ required: false })
  view: AttendanceView;
  @ApiProperty({ required: false })
  month: string;
  @ApiProperty({ required: false })
  year: string;
}

enum AttendanceView {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
}
