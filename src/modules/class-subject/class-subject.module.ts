import { Module } from '@nestjs/common';
import { ClassSubjectService } from './class-subject.service';
import { ClassSubjectController } from './class-subject.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { ClassSubjectSchema } from './entities/class-subject.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.CLASS_SUBJECT, schema: ClassSubjectSchema },
    ]),
  ],
  controllers: [ClassSubjectController],
  providers: [ClassSubjectService],
})
export class ClassSubjectModule {}
