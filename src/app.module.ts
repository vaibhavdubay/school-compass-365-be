import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StudentModule } from './modules/student/student.module';
import { AdminModule } from './modules/admin/admin.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { ProfileImageModule } from '@sc-modules/profile-image/profile-image.module';
import { SchoolModule } from './modules/school/school.module';
import { ClassModule } from './modules/class/class.module';
import { ParentOrGuardiansModule } from './modules/parent-or-guardians/parent-or-guardians.module';
import { AcademicYearModule } from './modules/academic-year/academic-year.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { join } from 'path';
import { cwd } from 'process';
import { NotifyModule } from '@sc-modules/notify/notify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: config.get<string>('MS_DB_USER'),
        password: config.get<string>('MS_DB_PASS'),
        database: config.get<string>('MS_DB'),
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.getOrThrow('EMAIL_HOST'),
          port: +config.getOrThrow('EMAIL_PORT'),
          secure: true,
          auth: {
            user: config.getOrThrow('EMAIL'),
            pass: config.getOrThrow('EMAIL_PASS'),
          },
        },
        defaults: {
          from: config.getOrThrow('EMAIL_FROM'),
        },
        template: {
          dir: join(cwd(), 'templates'),
          adapter: new PugAdapter({ inlineCssEnabled: true }),
          options: {
            strict: true,
          },
        },
      }),
    }),
    MulterModule.register(),
    ScheduleModule.forRoot(),
    NotifyModule,
    UsersModule,
    AuthModule,
    ProfileImageModule,
    StudentModule,
    AdminModule,
    TeacherModule,
    SchoolModule,
    ClassModule,
    ParentOrGuardiansModule,
    AcademicYearModule,
  ],
})
export class AppModule {}
