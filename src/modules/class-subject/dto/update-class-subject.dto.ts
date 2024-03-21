import { PartialType } from '@nestjs/swagger';
import { CreateClassSubjectDto } from './create-class-subject.dto';
import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';

export class UpdateClassSubjectDto extends PartialType(CreateClassSubjectDto) {
  @IsMongoId()
  class: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}
