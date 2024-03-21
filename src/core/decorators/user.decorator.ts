import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from '@sc-modules/admin/entities/admin.entity';
import { SchoolProfile } from '@sc-modules/school/entities/school.entity';
import { StudentProfile } from '@sc-modules/student-profile/entities/student-profile.entity';
import { TeacherProfile } from '@sc-modules/teacher-profile/entities/teacher-profile.entity';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      ...request.user['_doc'],
      school: request.user.schoolId,
      schoolId: request.user.schoolId?._id,
    };
  },
);

export type User = (Admin | StudentProfile | TeacherProfile) & {
  school: SchoolProfile;
};
