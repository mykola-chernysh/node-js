import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../types/token.type";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, { expiresIn: configs.JWT_ACCESS_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, { expiresIn: configs.JWT_REFRESH_EXPIRES_IN });

    return {
      accessToken,
      accessExpiresIn: configs.JWT_ACCESS_EXPIRES_IN,
      refreshToken,
      refreshExpiresIn: configs.JWT_REFRESH_EXPIRES_IN,
    };
  }

  public checkToken(token: string, type: "refresh" | "access"): ITokenPayload {
    try {
      let tokenSecret = "";

      switch (type) {
        case "access":
          tokenSecret = configs.JWT_ACCESS_SECRET;
          break;
        case "refresh":
          tokenSecret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, tokenSecret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Invalid token", 401);
    }
  }
}

export const tokenService = new TokenService();
