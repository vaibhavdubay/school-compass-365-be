import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { AdminModule } from '@sc-modules/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([School]), AdminModule],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
