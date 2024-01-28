import { Types } from "mongoose";

export interface ITokenPayload {
  userId: Types.ObjectId;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends ITokenPair {
  _userId: Types.ObjectId;
}
