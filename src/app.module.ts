import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from '@sc-helpers/global-exception.filter';

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
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
