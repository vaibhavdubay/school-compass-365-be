import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import mongoose from 'mongoose';

@Schema()
export class SchoolProfile {
  _id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ default: new Date().getFullYear() })
  establishedYear: number;

  @Prop({ required: true })
  address1: string;

  @Prop()
  address2: string;

  @Prop({
    required: true,
    ref: DB_Model.ACADEMIC_YEAR,
    type: [mongoose.Schema.Types.ObjectId],
  })
  academicYears: string[];

  @Prop({
    required: true,
    ref: DB_Model.ACADEMIC_YEAR,
    type: mongoose.Schema.Types.ObjectId,
  })
  currentAcademicYear: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ unique: true })
  schoolDISECode: string;

  @Prop({ unique: true })
  schoolCode: string;

  @Prop({ ref: DB_Model.CLASS, type: [mongoose.Schema.Types.ObjectId] })
  classes: string[];
}

export const SchoolProfileSchema = SchemaFactory.createForClass(SchoolProfile);

SchoolProfileSchema.pre('save', function (next) {
  this['academicYears'] = [this['currentAcademicYear']];
  next();
});
SchoolProfileSchema.pre('findOneAndUpdate', async function (next) {
  const school = await this.model.findOne<SchoolProfile>(this.getQuery());
  if (school.currentAcademicYear !== this['_update'].currentAcademicYear) {
    this['academicYears'] = [
      ...school.academicYears,
      this['_update'].currentAcademicYear,
    ];
  }
  next();
});
