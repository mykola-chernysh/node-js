import express, { Request, Response } from "express";

import { read, write } from "./fs.service";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await read();
    res.status(200).json({ data: users });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.get("/users/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const users = await read();
    const userIndex = users.findIndex((user) => user.id === +userId);

    res.json({ data: users[userIndex] });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { email, name, age } = req.body;

    if (!age || age <= 0) {
      throw new Error("incorrectly entered age");
    }

    if (!email) {
      throw new Error("Incorrectly entered e-mail");
    }

    if (!name || name.length <= 2) {
      throw new Error("Incorrectly entered name");
    }

    const users = await read();
    const newUser = { id: users[users.length - 1].id + 1, email, name, age };

    users.push(newUser);

    await write(users);

    res.status(201).json({ data: newUser });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const users = await read();
    const index = users.findIndex((user) => user.id === +userId);

    users.splice(index, 1);
    await write(users);

    res.sendStatus(204);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { email, age, name } = req.body;

    if (!age || age <= 0) {
      throw new Error("incorrectly entered age");
    }
    if (!email) {
      throw new Error("incorrectly entered email");
    }
    if (!name || name.length <= 2) {
      throw new Error("incorrectly entered name");
    }

    const users = await read();
    const user = users.find((user) => user.id === +userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = name;
    user.age = age;
    user.email = email;

    await write(users);

    res.status(201).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
