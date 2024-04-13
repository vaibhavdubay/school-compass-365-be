import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './dtos/login.dto';
import { User } from '@sc-decorators/user';
import { AuthService } from './auth.service';
import { Role } from '@sc-enums/role';
import { Auth } from '@sc-decorators/auth';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(':role/login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Param('role') role: Role,
    @Body() _req: LoginDto,
    @User() user: User,
  ): Promise<LoginResponse> {
    const response = this.authService.generateToken(user);
    return response;
  }

  @Get('user-profile')
  @Auth(Role.ALL)
  async getUserProfile(@User() user: User): Promise<User> {
    return user;
  }
}
