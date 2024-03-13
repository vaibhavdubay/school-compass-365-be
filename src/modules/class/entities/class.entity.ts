import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import Mongoose from 'mongoose';

@Schema()
export class Class {
  @Prop({ required: true })
  className: string;

  @Prop({ ref: DB_Model.CLASS, type: Mongoose.Schema.Types.ObjectId })
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
