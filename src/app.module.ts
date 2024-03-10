import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '@sc-modules/admin/admin.module';
import { AuthModule } from '@sc-modules/auth/auth.module';
import { SchoolModule } from '@sc-modules/school/school.module';
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
    AuthModule,
    AdminModule,
    StudentProfileModule,
    SchoolModule,
    TeacherProfileModule,
  ],
})
export class AppModule {}
