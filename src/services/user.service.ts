import { ApiError } from "../errors/api.error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();

    if (!users) {
      throw new ApiError("Users not found", 404);
    }

    return users;
  }

  public async getById(id: number) {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async create(body: IUser): Promise<IUser> {
    const newUser = await userRepository.create(body);
    const users = await userRepository.getAll();

    users.push(newUser);

    await userRepository.writeAll(users);

    return newUser;
  }

  public async deleteById(id: number) {
    const users = await userRepository.deleteById(id);

    if (!users) {
      throw new ApiError("Users not found", 404);
    }

    await userRepository.writeAll(users);
  }

  public async updateById(id: number, body: IUser): Promise<IUser> {
    const { name, age, email } = body;
    const users = await userRepository.getAll();
    const user = users.find((user) => user.id === id);

    if (!users) {
      throw new ApiError("Users not found", 404);
    }

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    user.name = name;
    user.age = age;
    user.email = email;

    await userRepository.writeAll(users);

    return user;
  }
}

export const userService = new UserService();
