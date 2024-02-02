import { IUser } from "../types/user.types";

export class UserPresenter {
  public static userToResponse(user: IUser) {
    return {
      name: user.name,
      email: user.email,
      age: user.age,
      isVerify: user.isVerify,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
