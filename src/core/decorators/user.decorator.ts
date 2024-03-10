import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from '@sc-modules/admin/entities/admin.entity';
import { StudentProfile } from '@sc-modules/student-profile/entities/student-profile.entity';
import { TeacherProfile } from '@sc-modules/teacher-profile/entities/teacher-profile.entity';
import { Schema } from 'mongoose';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export interface User extends Admin, StudentProfile, TeacherProfile {
  _id: Schema.Types.ObjectId;
}
