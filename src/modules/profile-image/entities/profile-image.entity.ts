import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@sc-enums/role';
import mongoose from 'mongoose';

@Schema()
export class ProfileImage {
  _id: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  originalName: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProfileImageSchema = SchemaFactory.createForClass(ProfileImage);
