import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';

import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StudentModule } from './modules/student/student.module';
import { AdminModule } from './modules/admin/admin.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { ImageModule } from '@sc-modules/image/image.module';
import { SchoolModule } from './modules/school/school.module';
import { ClassModule } from './modules/class/class.module';
import { ParentOrGuardiansModule } from './modules/parent-or-guardians/parent-or-guardians.module';
import { AcademicYearModule } from './modules/academic-year/academic-year.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { NotifyModule } from '@sc-modules/notify/notify.module';
import { OtpModule } from './modules/otp/otp.module';

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
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter({
            switch: function (value, options) {
              this.switch_value = value;
              return options.fn(this);
            },
            case: function (value, options) {
              if (value == this.switch_value) {
                return options.fn(this);
              }
            },
            default: function () {
              return true;
            },
          }),
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
    ImageModule,
    StudentModule,
    AdminModule,
    TeacherModule,
    SchoolModule,
    ClassModule,
    ParentOrGuardiansModule,
    AcademicYearModule,
    OtpModule,
  ],
})
export class AppModule {}
