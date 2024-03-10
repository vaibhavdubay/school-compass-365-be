import { Role } from '@sc-enums/role';
import { Schema } from 'mongoose';

export interface AccessTokenPayload {
  uid: Schema.Types.ObjectId;
  role: Role;
}

export interface AccessToken {
  access_token: string;
}
