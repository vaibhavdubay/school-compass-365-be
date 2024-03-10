import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop()
  schoolDISECode: string;

  @Prop()
  schoolCode: string;
}

export const SchoolProfileSchema = SchemaFactory.createForClass(SchoolProfile);
