import fs from "fs/promises";
import path from "path";

import { IUser } from "./interfaces/user.interface";

const pathToFile = path.join(process.cwd(), "users.json");

const read = async (): Promise<IUser[]> => {
  const json = await fs.readFile(pathToFile, { encoding: "utf-8" });
  return JSON.parse(json);
};

const write = async (users: IUser[]) => {
  await fs.writeFile(pathToFile, JSON.stringify(users));
};

export { read, write };
