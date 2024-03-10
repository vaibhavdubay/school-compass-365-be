import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '@sc-enums/role';
import { User as UserModel } from '@sc-modules/user/entities/user.entity';
import { Schema } from 'mongoose';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserModel => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserModel;
  },
);

export interface User {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  userName: string;
  createdAt: Date;
  updateAt: Date;
}
