import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
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
