import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '../models/auth.model';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: AccessTokenPayload) {
    const serviceInstance = this.authService.getSearchFunction(payload.role);
    const user = serviceInstance.findById(payload.uid, {
      schoolId:
        'name currentAcademicYear schoolCode schoolDISECode address1 address2 city state pincode establishedYear',
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
