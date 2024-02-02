import { FilterQuery } from "mongoose";

import { Token } from "../models/token.model";
import { User } from "../models/user.model";
import { IUser } from "../types/user.types";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }

  public async getById(id: string): Promise<IUser> {
    return await User.findOne({ _id: id });
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async getOneByParamsWithPassword(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params).select("+password");
  }

  public async getManyByParams(params: FilterQuery<IUser>) {
    return await User.find(params);
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

  public async findWithoutActivityAfter(date: Date): Promise<IUser[]> {
    return await User.aggregate([
      {
        $lookup: {
          from: Token.collection.name,
          let: { userId: "$_id" },
          pipeline: [{ $match: { $expr: { $eq: ["$_userId", "$$userId"] } } }, { $match: { createAt: { $gt: date } } }],
          as: "tokens",
        },
      },
      {
        $match: {
          tokens: { $size: 0 },
        },
      },
    ]);
  }
}

export const userRepository = new UserRepository();
