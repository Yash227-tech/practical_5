const { readData, writeData } = require('../data/db');



exports.signup = (req, res, next) => {
    try {
        const data = readData();
        const { name, email, password } = req.body;

        const existingUser = data.users.find(
            u => u.email.toLowerCase() === email.toLowerCase().trim()
        );
        if (existingUser) {
            const error = new Error('Email is already registered');
            error.status = 409;
            throw error;
        }

        const newUser = {
            id: data.users.length > 0
                ? Math.max(...data.users.map(u => u.id)) + 1
                : 1,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password,
            createdAt: new Date().toISOString()
        };

        data.users.push(newUser);
        writeData(data);

        const { password: _, ...safeUser } = newUser;
        res.status(201).json({ success: true, data: safeUser });
    } catch (err) {
        next(err);
    }
};



exports.login = (req, res, next) => {
    try {
        const data = readData();
        const { email, password } = req.body;

        const user = data.users.find(
            u => u.email.toLowerCase() === email.toLowerCase().trim() &&
                u.password === password
        );

        if (!user) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            throw error;
        }

        const { password: _, ...safeUser } = user;
        res.json({ success: true, data: safeUser });
    } catch (err) {
        next(err);
    }
};



exports.getUserById = (req, res, next) => {
    try {
        const data = readData();
        const user = data.users.find(u => u.id === parseInt(req.params.id));

        if (!user) {
            const error = new Error(`User with ID ${req.params.id} not found`);
            error.status = 404;
            throw error;
        }

        const { password: _, ...safeUser } = user;
        res.json({ success: true, data: safeUser });
    } catch (err) {
        next(err);
    }
};
