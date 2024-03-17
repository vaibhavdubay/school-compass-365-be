import { Module } from '@nestjs/common';
import { AcademicYearsService } from './academic-years.service';
import { AcademicYearsController } from './academic-years.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { AcademicYearSchema } from './entities/academic-year.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.ACADEMIC_YEAR, schema: AcademicYearSchema },
    ]),
  ],
  controllers: [AcademicYearsController],
  providers: [AcademicYearsService],
})
export class AcademicYearsModule {
  constructor(private readonly academicYearsService: AcademicYearsService) {
    this.createAcademicYear();
  }

  async createAcademicYear() {
    const val = await this.academicYearsService.exists({});
    if (!val) {
      const currentYear = new Date().getFullYear();
      await this.academicYearsService.create({
        academicYear: `${currentYear}-${currentYear + 1}`,
      });
    }
  }
}
