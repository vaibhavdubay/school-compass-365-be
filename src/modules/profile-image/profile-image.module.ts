import { Module } from '@nestjs/common';
import { ProfileImageService } from './profile-image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileImageSchema } from './entities/profile-image.entity';
import { DB_Model } from '@sc-enums/model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DB_Model.PROFILE_IMAGE, schema: ProfileImageSchema },
    ]),
  ],
  providers: [ProfileImageService],
  exports: [ProfileImageService],
})
export class ProfileImageModule {}
