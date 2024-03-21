import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class SubjectGroup {
  _id: string;
  @Prop({ required: true })
  schoolId: string;

  @Prop({ required: true })
  groupName: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const SubjectGroupSchema = SchemaFactory.createForClass(SubjectGroup);

SubjectGroupSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

SubjectGroupSchema.pre('findOneAndUpdate', function (next) {
  this['_update'].updatedAt = new Date();
  next();
});
