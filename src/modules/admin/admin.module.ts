import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImageModule } from '@sc-modules/profile-image/profile-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), ProfileImageModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
