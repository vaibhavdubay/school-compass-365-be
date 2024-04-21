import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImageModule } from '@sc-modules/profile-image/profile-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), ProfileImageModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
