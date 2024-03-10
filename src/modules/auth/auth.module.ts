import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '@sc-modules/admin/admin.module';
import { TeacherProfileModule } from '@sc-modules/teacher-profile/teacher-profile.module';
import { StudentProfileModule } from '@sc-modules/student-profile/student-profile.module';

@Module({
  imports: [
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
    AdminModule,
    TeacherProfileModule,
    StudentProfileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
