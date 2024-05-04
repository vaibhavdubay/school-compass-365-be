import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Admin } from '@sc-modules/admin/entities/admin.entity';
import { Student } from '@sc-modules/student/entities/student.entity';
import { Teacher } from '@sc-modules/teacher/entities/teacher.entity';

export const UserProfile = createParamDecorator(
  (key: keyof UserProfile, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
      const user = {
        ...(request.user?.['_doc'] ? request.user['_doc'] : request.user),
        school: request.user.schoolId,
        schoolId: request.user.schoolId?._id,
      };
      return key && user[key] ? user[key] : user;
    } catch (error) {
      throw new ForbiddenException(
        'Incorrect logged in user object found please contact the administrator',
      );
    }
  },
);

export type UserProfile = Admin | Teacher | Student;
