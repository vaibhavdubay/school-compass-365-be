import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@sc-modules/user/user.service';
import { compareSync } from 'bcrypt';
import { AccessTokenPayload } from '../models/auth.model';
import { User } from '@sc-decorators/user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUserName(username);
    return compareSync(pass, user.password) ? user : undefined;
  }

  generateToken(user: User) {
    const payload: AccessTokenPayload = { uid: user._id }; // Replace with relevant user data
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, user };
  }
}
