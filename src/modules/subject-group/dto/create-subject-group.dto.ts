import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectGroupDto {
  @IsString()
  @IsNotEmpty()
  groupName: string;
}
