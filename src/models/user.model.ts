import { model, Schema } from "mongoose";

import { IUser } from "../types/user.types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      require: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 99,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("user", userSchema);
