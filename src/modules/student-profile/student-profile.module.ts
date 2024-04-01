import { Module } from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';
import { StudentProfileController } from './student-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { StudentProfileSchema } from './entities/student-profile.entity';
import { ProfileImageModule } from '@sc-modules/profile-image/profile-image.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.STUDENT, schema: StudentProfileSchema },
    ]),
    ProfileImageModule,
  ],
  controllers: [StudentProfileController],
  providers: [StudentProfileService],
  exports: [StudentProfileService],
})
export class StudentProfileModule {}
