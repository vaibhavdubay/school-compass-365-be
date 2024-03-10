import { IsString, IsPostalCode, IsNotEmpty } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  establishedYear: number;
  @IsString()
  @IsNotEmpty()
  address1: string;
  @IsString()
  address2: string;
  @IsString()
  @IsNotEmpty()
  city: string;
  @IsString()
  @IsNotEmpty()
  state: string;
  @IsString()
  @IsNotEmpty()
  @IsPostalCode('IN')
  pincode: string;
}
