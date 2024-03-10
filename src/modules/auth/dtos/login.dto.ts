import { ApiProperty } from '@nestjs/swagger';
import { User } from '@sc-decorators/user';

export class LoginDto {
  @ApiProperty({ example: 'superadmin' })
  username: string;
  @ApiProperty({ example: 'SuperAdmin@1' })
  password: string;
}

export class LoginResponse {
  accessToken: string;
  user: User;
}
