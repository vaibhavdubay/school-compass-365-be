import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@sc-modules/users/users.service';
import {
  AccessTokenPayload,
  ResetPasswordDto,
  SendOtpDto,
  SignInDto,
  SignInResponse,
} from './dto/auth.dto';
import { compareSync } from 'bcrypt';
import { User } from '@sc-modules/users/entities/user.entity';
import { AdminService } from '@sc-modules/admin/admin.service';
import { StudentService } from '@sc-modules/student/student.service';
import { TeacherService } from '@sc-modules/teacher/teacher.service';
import { Role } from '@sc-enums/role';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserProfile } from '@sc-decorators/user-profile';
import { OtpService } from '@sc-modules/otp/otp.service';
import { FindOneOptions } from 'typeorm';
import { Admin } from '@sc-modules/admin/entities/admin.entity';
import { NotifyService } from '@sc-modules/notify/notify.service';
import { TEMPLATE } from '@sc-enums/template';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
    private readonly otpService: OtpService,
    private readonly notifyService: NotifyService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneBy({
      userName: signInDto.username,
    });
    if (user) {
      if (compareSync(signInDto.password, user.password)) {
        return await this.userProfile(user);
      }
      throw new UnauthorizedException(`Incorrect password`);
    }
    throw new NotFoundException(`User - ${signInDto.username} not found`);
  }

  userProfile(user: User) {
    const options: FindOneOptions<Admin> = {
      where: { user: { id: user.id } },
    };
    switch (user.role) {
      case Role.ADMIN:
        return this.adminService.findOne(options);
      case Role.STUDENT:
        return this.studentService.findOne({
          where: { user: { id: user.id } },
        });
      case Role.TEACHER:
        return this.teacherService.findOne({
          where: { user: { id: user.id } },
        });
      default:
        return this.superAdminObject();
    }
  }

  superAdminObject = () =>
    Promise.resolve({
      email: 'superadmin@schoolcompass365.co.in',
      userName: this.configService.get('SUPER_ADMIN_USER'),
      password: this.configService.get('SUPER_ADMIN_CRED'),
      role: Role.SUPER_ADMIN,
    });

  generateToken(userProfile: UserProfile): SignInResponse {
    const payload: AccessTokenPayload = {
      user: userProfile.user,
    };
    const remember = userProfile['rememberMe'] ?? false;
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: remember
        ? '6d'
        : this.configService.getOrThrow<string>('ACCESS_TOKEN_VALIDITY'),
    });
    return {
      token: {
        accessToken,
        expiresIn: this.jwtService.decode(accessToken).exp,
      },
      userProfile,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findOneBy({
      userName: resetPasswordDto.userName,
    });
    if (user) {
      if (await this.otpService.verifyOtp(user.id, resetPasswordDto.otp)) {
        await this.notifyService.prepareEmail({
          template: TEMPLATE.PASSWORD_RESET,
          to: user.email,
          subject: 'Your OTP to Reset Password for School Compass 365',
          data: {
            role: user.role,
            name: user.name,
            link: this.configService.get('FRONTEND'),
            userName: user.userName,
          },
        });
        return this.usersService.updateDocument(user.id, {
          ...user,
          password: resetPasswordDto.password,
          changePassword: false,
        });
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async sendOTP(userName: string): Promise<SendOtpDto> {
    const user = await this.usersService.findOneBy([
      { userName: userName },
      { email: userName },
    ]);
    if (user) {
      const dummyOtp = { otp: '', expires: 0 };
      const otp =
        user.role == Role.ADMIN
          ? dummyOtp
          : await this.otpService.createOtp(user.id);
      await this.notifyService.prepareEmail({
        template: TEMPLATE.PASSWORD_RESET_OTP,
        to: user.email,
        subject: 'Your OTP to Reset Password for School Compass 365',
        data: {
          role: user.role,
          otp: otp.otp,
          name: user.name,
          userName: user.userName,
        },
      });
      if (user.role == Role.ADMIN) {
        throw new BadRequestException(
          'Admins are not allowed to reset their password.',
        );
      }
      return {
        message: 'OTP sent successfully.',
        email: user.email,
        expires: otp.expires,
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
