import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { Role } from '@sc-enums/role';
import { genSalt, hash } from 'bcrypt';
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

  @Prop({ required: true, enum: Role })
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

AdminSchema.pre('save', async function (next) {
  this.role = Role.ADMIN;
  this.updateAt = new Date();
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
