import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DAYS } from '@sc-enums/days';
import { DB_Model } from '@sc-enums/model';
import mongoose from 'mongoose';

@Schema()
export class ClassSchedule {
  _id: string;
  @Prop({
    ref: DB_Model.SCHOOL,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  schoolId: string;

  @Prop({
    required: true,
    ref: DB_Model.CLASS,
    type: mongoose.Schema.Types.ObjectId,
  })
  class: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop({ required: true, enum: DAYS, default: DAYS.ALL })
  day: DAYS;

  @Prop()
  room: string;

  @Prop({
    required: true,
    ref: DB_Model.CLASS_SUBJECT,
    type: mongoose.Schema.Types.ObjectId,
  })
  subject: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const ClassScheduleSchema = SchemaFactory.createForClass(ClassSchedule);

ClassScheduleSchema.pre('findOneAndUpdate', function (next) {
  this['_update'].updatedAt = new Date();
  next();
});
