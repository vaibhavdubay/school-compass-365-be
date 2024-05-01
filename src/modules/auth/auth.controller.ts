import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserProfile } from '@sc-decorators/user-profile';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto, SignInDto } from './dto/auth.dto';
import { Auth } from '@sc-decorators/auth';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @ApiBody({ type: SignInDto })
  @UseGuards(AuthGuard('local'))
  signIn(@UserProfile() user: UserProfile) {
    return this.authService.generateToken(user);
  }
  @Get('profile')
  @Auth('all')
  userProfile(@UserProfile() user: UserProfile) {
    return user;
  }

  @Get('send-otp')
  sendOTP(@Query('userName') userName: string) {
    return this.authService.sendOTP(userName);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassword);
  }
}
