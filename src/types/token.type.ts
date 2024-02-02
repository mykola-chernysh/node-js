import { Types } from "mongoose";

import { ERole } from "../enums/role.enum";
import { EActionTokenType } from "../enums/token-type.enum";

export interface ITokenPayload {
  userId: string;
  role: ERole;
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

export interface IActionToken {
  actionToken: string;
  tokenType: EActionTokenType;
  _userId: Types.ObjectId;
}
