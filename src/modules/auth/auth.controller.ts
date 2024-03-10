import { Body, Controller, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './dtos/login.dto';
import { User } from '@sc-decorators/user';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Role } from '@sc-enums/role';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post(':role/login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Param('role') role: Role,
    @Body() _req: LoginDto,
    @User() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponse> {
    const response = this.authService.generateToken(user);
    res.cookie('authorization', 'Brearer ' + response.accessToken, {
      httpOnly: true,
      secure: true,
    });
    return response;
  }
}
