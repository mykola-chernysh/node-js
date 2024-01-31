import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  static password = joi.string().regex(regexConstant.PASSWORD).trim();
  static email = joi.string().lowercase().regex(regexConstant.EMAIL).trim();
  static userName = joi.string().min(3).max(50).trim().messages({
    "string.empty": "{{#label}} not be empty",
  });
  static age = joi.number().min(16).max(99).integer();

  static create = joi.object({
    email: this.email.required(),
    password: this.password.required(),
    name: this.userName.required(),
    age: this.age.required(),
  });

  static update = joi.object({
    name: this.userName,
    age: this.age,
  });

  static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
