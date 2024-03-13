import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import mongoose from 'mongoose';

@Schema()
export class SchoolProfile {
  @Prop({ required: true })
  name: string;

  @Prop({ default: new Date().getFullYear() })
  establishedYear: number;

  @Prop({ required: true })
  address1: string;

  @Prop()
  address2: string;

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
