import { FilterQuery, Types } from "mongoose";

import { Token } from "../models/token.model";
import { IToken } from "../types/token.type";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }

  public async getByParams(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async update(id: Types.ObjectId, dto: Partial<IToken>) {
    return await Token.findByIdAndUpdate(id, dto, { returnDocument: "after" });
  }
}

export const tokenRepository = new TokenRepository();
