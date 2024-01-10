const fs = require('node:fs/promises');
const path = require('node:path');
const express = require('express');

const pathToUsers = path.join(__dirname, 'users.json');

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
    try {
        const usersJson = await fs.readFile(pathToUsers, {encoding: 'utf-8'});
        const users = JSON.parse(usersJson);
        res.status(200).json({data: users});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.id;

        const usersJson = await fs.readFile(pathToUsers, {encoding: 'utf-8'});
        const users = JSON.parse(usersJson);
        const userIndex = users.findIndex((user) => user.id === +userId);

        res.json({data: users[userIndex]});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.post('/users', async (req, res) => {
    try {
        const {email, name, age} = req.body;

        if (!age || age <= 0) {
            throw new Error('incorrectly entered age');
        }

        if (!email) {
            throw new Error('Incorrectly entered e-mail');
        }

        if (!name || name.length <= 2) {
            throw new Error('Incorrectly entered name');
        }

        const usersJson = await fs.readFile(pathToUsers, {encoding: 'utf-8'});
        const users = JSON.parse(usersJson);
        const newUser = {id: users[users.length - 1].id + 1, email, name, age};

        users.push(newUser);

        await fs.writeFile(pathToUsers, JSON.stringify(users));

        res.status(201).json({data: newUser});
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.delete('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.id;
        const usersJson = await fs.readFile(pathToUsers, {encoding: 'utf-8'});
        const users = JSON.parse(usersJson);
        const index = users.findIndex((user) => user.id === +userId);

        users.splice(index, 1);
        await fs.writeFile(pathToUsers, JSON.stringify(users));

        res.sendStatus(204);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.put('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.id;
        const {email, age, name} = req.body;

        if (!age || age <= 0) {
            throw new Error('incorrectly entered age');
        }
        if (!email) {
            throw new Error('incorrectly entered email');
        }
        if (!name || name.length <= 2) {
            throw new Error('incorrectly entered name');
        }

        const usersJson = await fs.readFile(pathToUsers, {encoding: 'utf-8'});
        const users = JSON.parse(usersJson);
        const user = users.find((user) => user.id === userId);

        if (!user) {
            throw new Error('User not found');
        }

        user.name = name;
        user.age = age;
        user.email = email;

        await fs.writeFile(pathToUsers, JSON.stringify(users));

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

app.listen(port, () => {
    console.log(`Сервер слухає на порту ${port}`);
});