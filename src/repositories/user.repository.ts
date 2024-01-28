import { FilterQuery } from "mongoose";

import { User } from "../models/user.model";
import { IUser } from "../types/user.types";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }

  public async getById(id: string): Promise<IUser> {
    return await User.findOne({ _id: id });
  }

  public async getOneByParams(params: FilterQuery<IUser>) {
    return await User.findOne(params);
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async deleteById(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }

  public async updateById(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, { returnDocument: "after" });
  }
}

export const userRepository = new UserRepository();
