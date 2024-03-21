import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { ProfileUpdateHelper } from '@sc-helpers/profile-update.helper';
import mongoose from 'mongoose';

@Schema()
export class Admin {
  @Prop({ ref: DB_Model.SCHOOL, type: mongoose.Schema.Types.ObjectId })
  schoolId: string = '';

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({
    unique: true,
    required: true,
    lowercase: true,
    type: String,
  })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, enum: Role, default: Role.ADMIN })
  role: Role;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
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
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.pre('save', ProfileUpdateHelper(Role.ADMIN));
AdminSchema.pre('findOneAndUpdate', ProfileUpdateHelper(Role.ADMIN, true));
