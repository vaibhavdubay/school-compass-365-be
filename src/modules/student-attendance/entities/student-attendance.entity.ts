import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import mongoose from 'mongoose';

@Schema()
export class StudentAttendance {
  _id: string;
  @Prop({
    ref: DB_Model.SCHOOL,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  schoolId: string;
  @Prop({
    required: true,
    ref: DB_Model.ACADEMIC_YEAR,
    type: mongoose.Schema.Types.ObjectId,
  })
  academicYear: string;
  @Prop({
    required: true,
    ref: DB_Model.CLASS,
    type: mongoose.Schema.Types.ObjectId,
  })
  classId: string;
  @Prop({
    ref: DB_Model.CLASS_SCHEDULE,
    type: mongoose.Schema.Types.ObjectId,
  })
  classScheduleId: string;
  @Prop({
    required: true,
    ref: DB_Model.STUDENT,
    type: mongoose.Schema.Types.ObjectId,
  })
  studentId: string;
  @Prop({
    type: Date,
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    type: Date,
    default: new Date(),
  })
  updateAt: Date;
}

export const StudentAttendanceSchema =
  SchemaFactory.createForClass(StudentAttendance);
