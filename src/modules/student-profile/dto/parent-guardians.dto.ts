import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class Parents_Guardians {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  relationship: string;
  @IsObject()
  contact_info: {
    email: string;
    phone: string;
  };
}
