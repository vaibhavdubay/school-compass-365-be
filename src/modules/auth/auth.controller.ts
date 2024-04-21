import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserProfile } from '@sc-decorators/user-profile';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/auth.dto';
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

  @Post('send-otp')
  sendOTP() {
    return this.authService.sendOTP();
  }

  @Post('reset-password')
  resetPassword() {
    return this.authService.resetPassword();
  }
}
