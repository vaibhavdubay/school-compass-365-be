import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import mongoose from 'mongoose';
import { Parents_Guardians } from '../dto/parent-guardians.dto';
import { ProfileUpdateHelper } from 'src/core/helpers/profile-update.helper';
import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';

@Schema()
export class StudentProfile {
  @Prop({
    ref: DB_Model.SCHOOL,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  schoolId: string;

  @Prop({
    ref: DB_Model.CLASS,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  class: string;

  @Prop({})
  classSection: string = '';

  @Prop({ required: true, trim: true, type: String })
  firstName: string;

  @Prop({ required: true, trim: true, type: String })
  lastName: string;

  @Prop({
    required: true,
    lowercase: true,
    trim: true,
    type: String,
  })
  email: string;

  @Prop({ required: true, trim: true, type: String })
  password: string;

  @ApiHideProperty()
  @Prop({ required: true, enum: Role, trim: true, default: Role.STUDENT })
  role: Role;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    type: String,
  })
  userName: string;

  @Prop({
    type: Date,
    default: new Date(),
  })
  createdAt: Date;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({
    type: Date,
    default: new Date(),
  })
  updateAt: Date;

  @Prop({ unique: true })
  pen: string;

  @Prop({ enum: ACADEMIC_STATUS, default: ACADEMIC_STATUS.ACTIVE })
  academicStatus: ACADEMIC_STATUS;

  @Prop({
    type: Date,
    required: false,
  })
  dateOfBirth: Date;

  @Prop({
    enum: GENDER,
    required: true,
  })
  gender: GENDER;

  @Prop({
    enum: BLOOD_GROUP,
  })
  BLOOD_GROUP: BLOOD_GROUP;

  @Prop({
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        relationship: {
          type: String,
          required: true,
        },
        contact_info: {
          type: {
            email: {
              type: String,
              required: true,
            },
            phone: {
              type: String,
              required: false,
            },
          },
          required: true,
        },
      },
    ],
    required: true,
  })
  parents_guardians: Parents_Guardians[];

  @Prop({
    required: true,
    ref: DB_Model.ACADEMIC_YEAR,
    type: [mongoose.Schema.Types.ObjectId],
  })
  academicYears: string[];
}

export const StudentProfileSchema =
  SchemaFactory.createForClass(StudentProfile);

StudentProfileSchema.pre('save', ProfileUpdateHelper(Role.STUDENT));
StudentProfileSchema.pre(
  'findOneAndUpdate',
  ProfileUpdateHelper(Role.STUDENT, true),
);
