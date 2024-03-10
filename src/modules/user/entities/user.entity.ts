import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@sc-enums/role';
import { genSalt, hash } from 'bcrypt';

@Schema()
export class User {
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

  @Prop({ required: true, enum: Role, trim: true })
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

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  // Skip hashing if password hasn't changed
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
