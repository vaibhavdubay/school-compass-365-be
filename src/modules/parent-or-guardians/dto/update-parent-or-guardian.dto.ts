import { PartialType } from '@nestjs/swagger';
import { CreateParentOrGuardianDto } from './create-parent-or-guardian.dto';

export class UpdateParentOrGuardianDto extends PartialType(CreateParentOrGuardianDto) {}
