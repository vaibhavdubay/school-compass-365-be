import { PartialType } from '@nestjs/swagger';
import { CreateSubjectGroupDto } from './create-subject-group.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubjectGroupDto extends PartialType(CreateSubjectGroupDto) {
  @IsString()
  @IsNotEmpty()
  groupName: string;
  @IsBoolean()
  isActive: boolean;
}
