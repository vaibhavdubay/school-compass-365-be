import { Module } from '@nestjs/common';
import { StudentAttendanceService } from './student-attendance.service';
import { StudentAttendanceController } from './student-attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { StudentAttendanceSchema } from './entities/student-attendance.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DB_Model.STUDENT_ATTENDANCE,
        schema: StudentAttendanceSchema,
      },
    ]),
  ],
  controllers: [StudentAttendanceController],
  providers: [StudentAttendanceService],
})
export class StudentAttendanceModule {}
