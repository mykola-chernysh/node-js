import { model, Schema, Types } from "mongoose";

import { User } from "./user.model";

const tokenSchema = new Schema(
  {
    accessToken: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: String,
      require: true,
    },
    _userId: {
      type: Types.ObjectId,
      require: true,
      ref: User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model("tokens", tokenSchema);
