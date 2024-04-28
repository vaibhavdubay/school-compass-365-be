import { Global, Module } from '@nestjs/common';
import { AcademicYearService } from './academic-year.service';
import { AcademicYearController } from './academic-year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicYear } from './entities/academic-year.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AcademicYear])],
  controllers: [AcademicYearController],
  providers: [AcademicYearService],
  exports: [AcademicYearService],
})
export class AcademicYearModule {
  constructor(private _academicYearService: AcademicYearService) {
    this.createAcademicYear();
  }

  async createAcademicYear() {
    if (!(await this._academicYearService.existsBy({}))) {
      this._academicYearService.createAcademicYear();
    }
  }
}
