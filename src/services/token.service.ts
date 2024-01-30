import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../types/token.type";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, { expiresIn: "4h" });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, { expiresIn: "30d" });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkRefreshToken(token: string): ITokenPayload {
    try {
      const refreshSecret = configs.JWT_REFRESH_SECRET;

      return jwt.verify(token, refreshSecret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Invalid token (service)", 401);
    }
  }
}

export const tokenService = new TokenService();
