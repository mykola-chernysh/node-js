import { model, Schema, Types } from "mongoose";

import { EActionTokenType } from "../enums/token-type.enum";
import { User } from "./user.model";

const actionTokenSchema = new Schema(
  {
    actionToken: {
      type: String,
      require: true,
    },
    tokenType: {
      type: String,
      enum: EActionTokenType,
      required: true,
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

export const ActionToken = model("actionToken", actionTokenSchema);
