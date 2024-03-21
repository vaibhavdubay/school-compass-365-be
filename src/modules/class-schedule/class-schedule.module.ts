import { Module } from '@nestjs/common';
import { ClassScheduleService } from './class-schedule.service';
import { ClassScheduleController } from './class-schedule.controller';
import { DB_Model } from '@sc-enums/model';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassScheduleSchema } from './entities/class-schedule.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.CLASS_SCHEDULE, schema: ClassScheduleSchema },
    ]),
  ],
  controllers: [ClassScheduleController],
  providers: [ClassScheduleService],
})
export class ClassScheduleModule {}
