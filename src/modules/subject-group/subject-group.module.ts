import { Module } from '@nestjs/common';
import { SubjectGroupService } from './subject-group.service';
import { SubjectGroupController } from './subject-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { SubjectGroupSchema } from './entities/subject-group.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.SUBJECT_GROUP, schema: SubjectGroupSchema },
    ]),
  ],
  controllers: [SubjectGroupController],
  providers: [SubjectGroupService],
})
export class SubjectGroupModule {}
