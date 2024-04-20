import { Module } from '@nestjs/common';
import { ProfileImageService } from './profile-image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImage } from './entities/profile-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileImage])],
  providers: [ProfileImageService],
  exports: [ProfileImageService],
})
export class ProfileImageModule {}
