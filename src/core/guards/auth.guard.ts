import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@sc-decorators/user';
import { Role } from '@sc-enums/role';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const isPublicUrl = this.reflector.getAllAndOverride<Role[]>('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!(requiredRoles && requiredRoles.length) || isPublicUrl) {
      return true;
    }

    if (!(await super.canActivate(context))) return false;
    const user = context.switchToHttp().getRequest().user as User;
    const hasRequiredRole = requiredRoles.includes(user?.role);

    return hasRequiredRole;
  }
}
