import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '@sc-modules/admin/admin.module';
import { AuthModule } from '@sc-modules/auth/auth.module';
import { SchoolModule } from '@sc-modules/school/school.module';
import { StudentProfileModule } from '@sc-modules/student-profile/student-profile.module';
import { TeacherProfileModule } from '@sc-modules/teacher-profile/teacher-profile.module';
import { ClassModule } from './modules/class/class.module';
import { SubjectGroupModule } from './modules/subject-group/subject-group.module';
import { GlobalExceptionFilter } from './core/helpers/global-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AcademicYearsModule } from './modules/academic-years/academic-years.module';
import { ScheduleModule } from '@nestjs/schedule';

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
    AdminModule,
    AuthModule,
    ClassModule,
    SchoolModule,
    StudentProfileModule,
    SubjectGroupModule,
    TeacherProfileModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
