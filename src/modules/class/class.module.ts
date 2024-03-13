import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { ClassSchema } from './entities/class.entity';
import { DEFAULT_CLASSES } from '@sc-constants/class';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DB_Model.CLASS, schema: ClassSchema }]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {
  constructor(private readonly classService: ClassService) {
    this.createClasses();
  }

  async createClasses() {
    const val = await this.classService.exists({});
    if (!val) {
      await this.classService.classModel.create(DEFAULT_CLASSES);
      const classes = await this.classService.classModel
        .aggregate([{ $sort: { order: 1 } }])
        .exec();

      for (let i = 0; i < classes.length - 1; i++) {
        const currentClass = classes[i];
        const nextClass = classes[i + 1];
        await this.classService.classModel.updateOne(
          { _id: currentClass._id },
          { $set: { nextClass: nextClass._id } },
        );
      }
    }
  }
}
