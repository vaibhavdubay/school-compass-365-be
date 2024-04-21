import { Injectable } from '@nestjs/common';
import { CreateParentOrGuardianDto } from './dto/create-parent-or-guardian.dto';
import { UpdateParentOrGuardianDto } from './dto/update-parent-or-guardian.dto';
import { BaseRepository } from '@sc-helpers/repository.helper';
import { DataSource } from 'typeorm';
import { ParentOrGuardian } from './entities/parent-or-guardian.entity';

@Injectable()
export class ParentOrGuardiansService extends BaseRepository<
  ParentOrGuardian,
  CreateParentOrGuardianDto,
  UpdateParentOrGuardianDto
> {
  constructor(readonly dataSource: DataSource) {
    super(ParentOrGuardian, dataSource.createEntityManager());
  }
}
