import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Admin } from '@sc-modules/admin/entities/admin.entity';
import { SchoolProfile } from '@sc-modules/school/entities/school.entity';
import { StudentProfile } from '@sc-modules/student-profile/entities/student-profile.entity';
import { TeacherProfile } from '@sc-modules/teacher-profile/entities/teacher-profile.entity';

export const User = createParamDecorator(
  (key: keyof User, ctx: ExecutionContext) => {
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

export type User = (Admin | StudentProfile | TeacherProfile) & {
  school: SchoolProfile;
};
