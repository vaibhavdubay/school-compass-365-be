import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, username: string, password: string): Promise<any> {
    const user = await this.authService.signIn({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { ...user, rememberMe: req.body.remember};
  }
}
