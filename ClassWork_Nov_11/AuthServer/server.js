// NOTE: load .env FIRST so process.env is filled before anything uses it
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
// EXPLAIN: lets Express read JSON request bodies into req.body
app.use(express.json());

// NOTE: sample data in memory (no database today)
const posts = [
    { userName: 'Herman',  title: 'My favorite Scare Tactics' },
    { userName: 'GrandPa', title: 'GrandPa is scary' },
    { userName: 'Jake',    title: 'Jakes Theory on the Munsters' }
];
const users = ['Herman', 'GrandPa', 'Jake'];
// Public route: anyone can see every post
app.get('/posts', (req, res) => {
    res.json(posts);
});

// START: login route
app.post('/login', (req, res) => {
    const userName = req.body.userName;
    if (!userName) {
        // EXPLAIN: return stops the function; 400 = bad request
        return res.status(400).json({ error: 'userName is required' });
    }
    // EXPLAIN: 401 = we don't know who you are
    if (!users.includes(userName)) {
        return res.status(401).json({ error: 'Unknown user' });
    }

    // BOARD: password is read but never checked (Wednesday's problem)
    const password = req.body.password;

    // EXPLAIN: this object becomes the token payload
    const user = { name: userName };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    res.json({ accessToken });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
