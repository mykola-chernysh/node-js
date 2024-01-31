import { Types } from "mongoose";

export interface ITokenPayload {
  userId: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}

export interface IToken extends ITokenPair {
  _userId: Types.ObjectId;
}
