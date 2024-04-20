import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImageModule } from '@sc-modules/profile-image/profile-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), ProfileImageModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
