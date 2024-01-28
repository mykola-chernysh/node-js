import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
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

  public async deleteById(id: string): Promise<void> {
    const users = await userRepository.getById(id);

    if (!users) {
      throw new ApiError("Users not found", 404);
    }

    await userRepository.deleteById(id);
  }

  public async updateById(id: string, dto: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return await userRepository.updateById(id, dto);
  }
}

export const userService = new UserService();
