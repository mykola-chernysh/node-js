import { Types } from "mongoose";

import { EEmailAction } from "../enums/email-action.enum";
import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ILogin } from "../types/auth.type";
import { ITokenPair, ITokenPayload } from "../types/token.type";
import { IUser } from "../types/user.types";
import { emailService } from "./emai.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async singUp(dto: Partial<IUser>): Promise<IUser> {
    const userFromDb = await userRepository.getOneByParams({ email: dto.email });
    if (userFromDb) {
      throw new ApiError("User already exists", 400);
    }

    const hashedPassword = await passwordService.hash(dto.password);
    await emailService.sendMail(dto.email, EEmailAction.WELCOME, { name: dto.name });

    return await userRepository.create({ ...dto, password: hashedPassword });
  }

  public async singIn(dto: ILogin): Promise<ITokenPair> {
    const user = await userRepository.getOneByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Not valid email or password", 401);
    }

    const isMatch = await passwordService.compare(dto.password, user.password);
    if (!isMatch) {
      throw new ApiError("Not valid email or password", 401);
    }

    const jwtTokens = tokenService.generateTokenPair({ userId: user._id });
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });

    return jwtTokens;
  }

  public async refresh(jwtPayload: ITokenPayload, refreshToken: string): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const jwtTokens = tokenService.generateTokenPair({ userId: jwtPayload.userId });

    await tokenRepository.create({ ...jwtTokens, _userId: new Types.ObjectId(jwtPayload.userId) });

    return jwtTokens;
  }
}

export const authService = new AuthService();
