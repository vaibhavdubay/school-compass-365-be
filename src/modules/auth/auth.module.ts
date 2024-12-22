import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@sc-modules/users/users.module';
import { AdminModule } from '@sc-modules/admin/admin.module';
import { StudentModule } from '@sc-modules/student/student.module';
import { TeacherModule } from '@sc-modules/teacher/teacher.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { OtpModule } from '@sc-modules/otp/otp.module';
import { NotifyModule } from '@sc-modules/notify/notify.module';

@Module({
  imports: [
    OtpModule,
    UsersModule,
    AdminModule,
    StudentModule,
    TeacherModule,
    NotifyModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>('ACCESS_TOKEN_VALIDITY'),
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
