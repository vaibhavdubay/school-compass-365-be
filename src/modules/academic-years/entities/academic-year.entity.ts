import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AcademicYear {
  _id: string;
  @Prop({
    required: true,
    type: String,
    unique: true,
    default: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
  })
  academicYear: string;
  @Prop({ default: true })
  current: boolean;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const AcademicYearSchema = SchemaFactory.createForClass(AcademicYear);

AcademicYearSchema.pre('save', function (next) {
  next();
});
AcademicYearSchema.pre('findOneAndUpdate', function (next) {
  this['_update'].updatedAt = new Date();
  next();
});
