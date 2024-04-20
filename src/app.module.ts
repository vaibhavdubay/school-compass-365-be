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
    MulterModule.register(),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    ProfileImageModule,
    StudentModule,
    AdminModule,
    TeacherModule,
  ],
})
export class AppModule {}
