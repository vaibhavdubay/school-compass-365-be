import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'superadmin' })
  username: string;
  @ApiProperty({ example: 'SuperAdmin@1' })
  password: string;
}
