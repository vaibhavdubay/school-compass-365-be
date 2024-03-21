import { Role } from '@sc-enums/role';

export interface AccessTokenPayload {
  uid: string;
  role: Role;
}

export interface AccessToken {
  access_token: string;
}
