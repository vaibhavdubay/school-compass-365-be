import { Module } from '@nestjs/common';
import { TeachersEducationService } from './teachers-education.service';
import { TeachersEducationController } from './teachers-education.controller';
import { TeachersEducation } from './entities/teachers-education.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeachersEducation])],
  controllers: [TeachersEducationController],
  providers: [TeachersEducationService],
})
export class TeachersEducationModule {}
