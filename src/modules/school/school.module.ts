import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { SchoolProfileSchema } from './entities/school.entity';
import { StudentProfileSchema } from '@sc-modules/student-profile/entities/student-profile.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.SCHOOL, schema: SchoolProfileSchema },
      { name: DB_Model.STUDENT, schema: StudentProfileSchema },
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
