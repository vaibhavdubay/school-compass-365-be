import { Module } from '@nestjs/common';
import { TeacherProfileService } from './teacher-profile.service';
import { TeacherProfileController } from './teacher-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { TeacherProfileSchema } from './entities/teacher-profile.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.TEACHER, schema: TeacherProfileSchema },
    ]),
  ],
  controllers: [TeacherProfileController],
  providers: [TeacherProfileService],
  exports: [TeacherProfileService],
})
export class TeacherProfileModule {}
