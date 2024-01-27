import { read, write } from "../fs.service";
import { IUser } from "../interfaces/user.interface";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await read();
  }

  public async getById(id: number): Promise<IUser> {
    const users = await read();
    const index = users.findIndex((user) => user.id === id);
    const user = users[index];

    return user;
  }

  public async writeAll(users: IUser[]): Promise<void> {
    await write(users);
  }

  public async create(body: IUser): Promise<IUser> {
    const { name, age, email } = body;
    const users = await read();

    const newUser = { id: users[users.length - 1].id + 1, name, age, email };

    return newUser;
  }

  public async deleteById(id: number): Promise<IUser[]> {
    const users = await read();
    const index = users.findIndex((user) => user.id === id);

    users.splice(index, 1);

    return users;
  }
}

export const userRepository = new UserRepository();
