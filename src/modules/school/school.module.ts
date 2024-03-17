import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { SchoolProfileSchema } from './entities/school.entity';
import { StudentProfileSchema } from '@sc-modules/student-profile/entities/student-profile.entity';
import { AcademicYearSchema } from '@sc-modules/academic-years/entities/academic-year.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.SCHOOL, schema: SchoolProfileSchema },
      { name: DB_Model.STUDENT, schema: StudentProfileSchema },
      { name: DB_Model.ACADEMIC_YEAR, schema: AcademicYearSchema },
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
