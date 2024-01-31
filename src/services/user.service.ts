import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { ITokenPayload } from "../types/token.type";
import { IUser } from "../types/user.types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError("User not found", 422);
    }

    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 403);
    }

    return user;
  }

  public async updateMe(jwtPayload: ITokenPayload, dto: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 403);
    }

    return await userRepository.updateById(jwtPayload.userId, dto);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    const users = await userRepository.getById(jwtPayload.userId);

    if (!users) {
      throw new ApiError("Users not found", 403);
    }

    await userRepository.deleteById(jwtPayload.userId);
  }
}

export const userService = new UserService();
