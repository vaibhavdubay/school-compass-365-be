import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { SchoolProfileSchema } from './entities/school.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.SCHOOL, schema: SchoolProfileSchema },
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
