import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { ProfileUpdateHelper } from '@sc-helpers/profile-update.helper';
import mongoose from 'mongoose';

@Schema()
export class TeacherProfile {
  _id: string;
  @Prop({ ref: DB_Model.SCHOOL, type: mongoose.Schema.Types.ObjectId })
  schoolId: string;

  @Prop({ required: true, trim: true, type: String })
  firstName: string;

  @Prop({ required: true, trim: true, type: String })
  lastName: string;

  @Prop({
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    type: String,
  })
  email: string;

  @Prop({ required: true, trim: true, type: String })
  password: string;

  @ApiHideProperty()
  @Prop({ required: true, enum: Role, trim: true, default: Role.TEACHER })
  role: Role;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    type: String,
  })
  userName: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

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
  @Prop({
    type: [String],
    required: true,
  })
  subjects: string[];
  @Prop({
    type: Number,
    required: true,
  })
  years_of_experience: number;
}

export const TeacherProfileSchema =
  SchemaFactory.createForClass(TeacherProfile);

TeacherProfileSchema.pre('save', ProfileUpdateHelper(Role.TEACHER));
TeacherProfileSchema.pre(
  'findOneAndUpdate',
  ProfileUpdateHelper(Role.TEACHER, true),
);
