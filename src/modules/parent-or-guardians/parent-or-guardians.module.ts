import { Module } from '@nestjs/common';
import { ParentOrGuardiansService } from './parent-or-guardians.service';
import { ParentOrGuardiansController } from './parent-or-guardians.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentOrGuardian } from './entities/parent-or-guardian.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParentOrGuardian])],
  controllers: [ParentOrGuardiansController],
  providers: [ParentOrGuardiansService],
})
export class ParentOrGuardiansModule {}
