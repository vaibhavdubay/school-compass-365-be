import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from '@sc-decorators/user-profile';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @Length(6, 8)
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

export class SendOtpDto {
  message: string;
  email: string;
  expires: number;
}

export class ResetPasswordDto {
  @Length(6, 8)
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
  @ApiProperty({ example: '000000' })
  @Length(6, 6)
  otp: string;
  @IsString()
  @IsNotEmpty()
  userName: string;
}
