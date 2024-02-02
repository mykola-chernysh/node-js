import { Types } from "mongoose";

import { EEmailAction } from "../enums/email-action.enum";
import { ERole } from "../enums/role.enum";
import { EActionTokenType } from "../enums/token-type.enum";
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
  public async singUpAdmin(dto: Partial<IUser>): Promise<IUser> {
    const userFromDb = await userRepository.getOneByParams({ email: dto.email });
    if (userFromDb) {
      throw new ApiError("User already exists", 400);
    }

    const hashedPassword = await passwordService.hash(dto.password);

    return await userRepository.create({ ...dto, password: hashedPassword, role: ERole.ADMIN });
  }

  public async singInAdmin(dto: ILogin): Promise<ITokenPair> {
    const user = await userRepository.getOneByParams({ email: dto.email, role: ERole.ADMIN });
    if (!user) {
      throw new ApiError("Not valid email or password", 401);
    }

    const isMatch = await passwordService.compare(dto.password, user.password);
    if (!isMatch) {
      throw new ApiError("Not valid email or password", 401);
    }

    const jwtTokens = tokenService.generateTokenPair({ userId: user._id, role: ERole.ADMIN }, ERole.ADMIN);
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });

    return jwtTokens;
  }

  public async singUp(dto: Partial<IUser>): Promise<IUser> {
    const userFromDb = await userRepository.getOneByParams({ email: dto.email });
    if (userFromDb) {
      throw new ApiError("User already exists", 400);
    }

    const hashedPassword = await passwordService.hash(dto.password);
    const user = await userRepository.create({ ...dto, password: hashedPassword });

    const actionToken = tokenService.createActionToken({ userId: user._id, role: ERole.USER }, EActionTokenType.ACTIVE);

    await Promise.all([
      tokenRepository.createActionToken({ actionToken, _userId: user._id, tokenType: EActionTokenType.ACTIVE }),
      emailService.sendMail(dto.email, EEmailAction.WELCOME, { name: dto.name, actionToken }),
    ]);

    return user;
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

    if (!user.isVerify) {
      throw new ApiError("Please, verify you account", 403);
    }

    const jwtTokens = tokenService.generateTokenPair({ userId: user._id, role: ERole.USER }, ERole.USER);
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });

    return jwtTokens;
  }

  public async refresh(jwtPayload: ITokenPayload, refreshToken: string): Promise<ITokenPair> {
    const user = await userRepository.getById(jwtPayload.userId);
    await tokenRepository.deleteOneByParams({ refreshToken });
    const jwtTokens = tokenService.generateTokenPair({ userId: jwtPayload.userId, role: user.role }, user.role);

    await tokenRepository.create({ ...jwtTokens, _userId: new Types.ObjectId(jwtPayload.userId) });

    return jwtTokens;
  }

  public async forgotPassword(user: IUser) {
    const actionToken = tokenService.createActionToken({ userId: user._id, role: ERole.USER }, EActionTokenType.FORGOT);

    await Promise.all([
      tokenRepository.createActionToken({ actionToken, _userId: user._id, tokenType: EActionTokenType.FORGOT }),
      emailService.sendMail(user.email, EEmailAction.FORGOT_PASSWORD, { actionToken }),
    ]);
  }

  public async setForgotPassword(password: string, actionToken: string) {
    const payload = tokenService.checkActionToken(actionToken, EActionTokenType.FORGOT);

    const entity = await tokenRepository.getActionTokenByParams({ actionToken });
    if (!entity) {
      throw new ApiError("Token is not valid", 400);
    }

    const newHashedPassword = await passwordService.hash(password);

    await Promise.all([
      userRepository.updateById(payload.userId, { password: newHashedPassword }),
      tokenRepository.deleteActionTokenByParams({ actionToken }),
    ]);
  }

  public async verify(actionToken: string) {
    const payload = tokenService.checkActionToken(actionToken, EActionTokenType.ACTIVE);

    const entity = await tokenRepository.getActionTokenByParams({ actionToken });
    if (!entity) {
      throw new ApiError("Token is not valid", 400);
    }

    await Promise.all([
      userRepository.updateById(payload.userId, { isVerify: true }),
      tokenRepository.deleteActionTokenByParams({ actionToken }),
    ]);
  }
}

export const authService = new AuthService();
