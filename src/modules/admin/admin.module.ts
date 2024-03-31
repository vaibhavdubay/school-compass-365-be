import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_Model } from '@sc-enums/model';
import { AdminSchema } from './entities/admin.entity';
import { ProfileImageModule } from '@sc-modules/profile-image/profile-image.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DB_Model.ADMIN, schema: AdminSchema }]),
    ProfileImageModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
