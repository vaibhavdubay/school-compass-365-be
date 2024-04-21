import { UserProfile } from '@sc-decorators/user-profile';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}

export class SignInResponse {
  accessToken: string;
  userProfile: UserProfile;
}

export class AccessTokenPayload {
  userProfile: UserProfile;
}

export class AccessToken {
  access_token: string;
}
