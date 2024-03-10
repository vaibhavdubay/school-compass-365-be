import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { genSalt, hash } from 'bcrypt';
import mongoose from 'mongoose';

export class StudentProfile {
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

  @Prop({
    type: Date,
    default: new Date(),
  })
  updateAt: Date;
}

export const StudentProfileSchema =
  SchemaFactory.createForClass(StudentProfile);

StudentProfileSchema.pre('save', async function (next) {
  // Skip hashing if password hasn't changed
  this.updateAt = new Date();
  this.role = Role.STUDENT;
  if (this.isModified('userName') && !this.userName) {
    this.userName = this.email;
  }
  if (this.isModified('password') && this.password) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});
