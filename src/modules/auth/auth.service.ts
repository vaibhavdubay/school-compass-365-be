import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@sc-modules/users/users.service';
import { AccessTokenPayload, SignInDto, SignInResponse } from './dto/auth.dto';
import { compareSync } from 'bcrypt';
import { User } from '@sc-modules/users/entities/user.entity';
import { AdminService } from '@sc-modules/admin/admin.service';
import { StudentService } from '@sc-modules/student/student.service';
import { TeacherService } from '@sc-modules/teacher/teacher.service';
import { Role } from '@sc-enums/role';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserProfile } from '@sc-decorators/user-profile';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly studentService: StudentService,
    private readonly teacherService: TeacherService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneBy({
      userName: signInDto.userName,
    });
    if (user) {
      if (compareSync(signInDto.password, user.password)) {
        return await this.userProfile(user);
      }
      throw new UnauthorizedException(`Incorrect password`);
    }
    throw new NotFoundException(`User - ${signInDto.userName} not found`);
  }

  userProfile(user: User) {
    switch (user.role) {
      case Role.ADMIN:
        return this.adminService.findOneBy({ user: user });
      case Role.STUDENT:
        return this.studentService.findOneBy({ user: user });
      case Role.TEACHER:
        return this.teacherService.findOneBy({ user: user });
      default:
        return this.superAdminObject();
    }
  }

  superAdminObject = () =>
    new Promise((resolve) =>
      resolve({
        email: 'superadmin@schoolcompass365.co.in',
        userName: this.configService.get('SUPER_ADMIN_USER'),
        password: this.configService.get('SUPER_ADMIN_CRED'),
        role: Role.SUPER_ADMIN,
      }),
    );

  generateToken(userProfile: UserProfile): SignInResponse {
    const payload: AccessTokenPayload = {
      userProfile,
    }; // Replace with relevant user data
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, userProfile };
  }

  resetPassword(): void {}
  sendOTP(): void {}
}
