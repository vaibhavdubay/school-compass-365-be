import { GENDER } from '@sc-enums/gender';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateParentOrGuardianDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEnum(GENDER)
  gender: GENDER;
  @IsString()
  @IsNotEmpty()
  relations: string;
  @IsString()
  @IsNotEmpty()
  contactEmail: string;
  @IsString()
  @IsNotEmpty()
  contactPhone: string;
}
