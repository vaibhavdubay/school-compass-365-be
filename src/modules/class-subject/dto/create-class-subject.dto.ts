import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateClassSubjectDto {
  @IsMongoId()
  class: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}
