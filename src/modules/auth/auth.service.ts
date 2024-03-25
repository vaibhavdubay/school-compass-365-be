import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { AccessTokenPayload } from './models/auth.model';
import { User } from '@sc-decorators/user';
import { Role } from '@sc-enums/role';
import { AdminService } from '@sc-modules/admin/admin.service';
import { StudentProfileService } from '@sc-modules/student-profile/student-profile.service';
import { TeacherProfileService } from '@sc-modules/teacher-profile/teacher-profile.service';
import { ConfigService } from '@nestjs/config';
import { LoginResponse } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private studentService: StudentProfileService,
    private teacherService: TeacherProfileService,
    private configService: ConfigService,
  ) {}
  async validateUser(userName: string, pass: string, role: Role): Promise<any> {
    const user = (await this.getSearchFunction(role).findOne(
      {
        userName,
      },
      {
        schoolId:
          'name currentAcademicYear schoolCode schoolDISECode address1 address2 city state pincode establishedYear',
      },
    )) as User;
    if (user) {
      return compareSync(pass, user.password) ? user : undefined;
    } else return false;
  }

  getSearchFunction(role: Role) {
    switch (role) {
      case Role.ADMIN:
        return this.adminService;
      case Role.TEACHER:
        return this.teacherService;
      case Role.STUDENT:
        return this.studentService;
      case Role.SUPER_ADMIN:
        return {
          findOne: this.superAdminObject,
          findById: this.superAdminObject,
        };
      default:
        throw new NotFoundException();
    }
  }

  superAdminObject = () =>
    new Promise((resolve) =>
      resolve({
        email: 'superadmin@sc-365.com',
        password: this.configService.get('SUPER_ADMIN_CRED'),
        userName: this.configService.get('SUPER_ADMIN_USER'),
        role: Role.SUPER_ADMIN,
      }),
    );

  generateToken(user: User): LoginResponse {
    const payload: AccessTokenPayload = {
      uid: user._id,
      role: user.role,
    }; // Replace with relevant user data
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user };
  }
}
