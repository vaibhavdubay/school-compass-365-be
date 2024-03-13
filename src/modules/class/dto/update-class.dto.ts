import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './create-class.dto';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassDto extends PartialType(CreateClassDto) {
  @IsString()
  @IsNotEmpty()
  className: string;
  @IsBoolean()
  isActive: boolean;
}
