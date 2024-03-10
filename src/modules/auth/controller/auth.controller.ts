import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { User } from '@sc-decorators/user';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() _req: LoginDto,
    @User() user: User,
    @Res() res: Response,
  ): Promise<any> {
    const response = this.authService.generateToken(user);
    res.cookie('authorization', 'Brearer ' + response.accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).send(response);
  }
}
