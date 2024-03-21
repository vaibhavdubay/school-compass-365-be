import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import mongoose from 'mongoose';

@Schema()
export class ClassSubject {
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
  subject: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const ClassSubjectSchema = SchemaFactory.createForClass(ClassSubject);

ClassSubjectSchema.pre('findOneAndUpdate', function (next) {
  this['_update'].updatedAt = new Date();
  next();
});
