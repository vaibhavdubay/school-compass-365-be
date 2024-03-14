import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '@sc-enums/role';
import { JwtGuard } from '@sc-guards/auth';

export function Auth(...roles: Role[]) {
  if (roles.length)
    return applyDecorators(
      SetMetadata('roles', roles),
      UseGuards(JwtGuard),
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  else
    return applyDecorators(ApiExcludeEndpoint(), SetMetadata('public', true));
}
