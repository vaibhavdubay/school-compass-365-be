import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from '@sc-modules/auth/auth.module';
import { ClassModule } from '@sc-modules/class/class.module';
import { AdminModule } from '@sc-modules/admin/admin.module';
import { SchoolModule } from '@sc-modules/school/school.module';
import { ClassSubjectModule } from '@sc-modules/class-subject/class-subject.module';
import { SubjectGroupModule } from '@sc-modules/subject-group/subject-group.module';
import { AcademicYearsModule } from '@sc-modules/academic-years/academic-years.module';
import { ClassScheduleModule } from '@sc-modules/class-schedule/class-schedule.module';
import { StudentProfileModule } from '@sc-modules/student-profile/student-profile.module';
import { TeacherProfileModule } from '@sc-modules/teacher-profile/teacher-profile.module';
import { StudentAttendanceModule } from './modules/student-attendance/student-attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register(),
    ScheduleModule.forRoot(),

    AcademicYearsModule,
    AuthModule,
    AdminModule,
    ClassModule,
    ClassScheduleModule,
    SchoolModule,
    StudentProfileModule,
    SubjectGroupModule,
    TeacherProfileModule,
    ClassSubjectModule,
    StudentAttendanceModule,
  ],
})
export class AppModule {}
