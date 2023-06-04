import express, { Request, Response } from 'express';

interface User {
    id: number;
    username: string;
    name?: string;
}

let users: User[] = [];
let nextId = 1;

const app = express();
app.use(express.json());

// Створення користувача
app.post('/users', (req: Request, res: Response) => {
    const { username, name } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const newUser: User = {
        id: nextId++,
        username,
        name
    };

    users.push(newUser);
    res.json(newUser);
});

// Отримання даних користувача за його id
app.get('/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
});

// Список користувачів
app.get('/users', (req: Request, res: Response) => {
    res.json(users);
});

// Оновлення даних користувача за його id
app.put('/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { username, name } = req.body;

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.username = username || user.username;
    user.name = name || user.name;

    res.json(user);
});

// Видалення користувача за його id
app.delete('/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const deletedUser = users.splice(index, 1)[0];

    res.json(deletedUser);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});