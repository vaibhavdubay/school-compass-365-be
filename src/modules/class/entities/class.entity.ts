import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import mongoose from 'mongoose';

@Schema()
export class Class {
  _id: string;
  @Prop({ required: true })
  className: string;

  @Prop({ ref: DB_Model.CLASS, type: mongoose.Schema.Types.ObjectId })
  nextClass: string;

  @Prop()
  order: number;

  @Prop()
  streamsRequired: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

ClassSchema.pre('findOneAndUpdate', function (next) {
  this['_update'].updatedAt = new Date();
  next();
});
