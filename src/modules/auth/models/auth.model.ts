import { Schema } from 'mongoose';

export interface AccessTokenPayload {
  uid: Schema.Types.ObjectId;
}

export interface AccessToken {
  access_token: string;
}
