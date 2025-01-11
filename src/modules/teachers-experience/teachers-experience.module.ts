import { Module } from '@nestjs/common';
import { TeachersExperienceService } from './teachers-experience.service';
import { TeachersExperienceController } from './teachers-experience.controller';
import { TeachersExperience } from './entities/teachers-experience.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeachersExperience])],
  controllers: [TeachersExperienceController],
  providers: [TeachersExperienceService],
})
export class TeachersExperienceModule {}
