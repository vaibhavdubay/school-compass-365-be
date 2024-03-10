import { Module } from '@nestjs/common';
import { StudentProfileService } from './student-profile.service';
import { StudentProfileController } from './student-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { StudentProfileSchema } from './entities/student-profile.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.STUDENT, schema: StudentProfileSchema },
    ]),
  ],
  controllers: [StudentProfileController],
  providers: [StudentProfileService],
  exports: [StudentProfileService],
})
export class StudentProfileModule {}
