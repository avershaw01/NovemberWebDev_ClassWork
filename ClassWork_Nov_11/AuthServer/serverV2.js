// NOTE: load .env FIRST so process.env is filled before anything uses it
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const cors = require("cors");
// EXPLAIN: lets Express read JSON request bodies into req.body
app.use(express.json());
app.use(cors())

// NOTE: sample data in memory (no database today)
const posts = [
    { userName: 'Herman',  title: 'My favorite Scare Tactics' },
    { userName: 'GrandPa', title: 'GrandPa is scary' },
    { userName: 'Jake',    title: 'Jakes Theory on the Munsters' }
];

// START: middleware that checks the token before the route runs
function authenticateToken(req, res, next) {
    // EXPLAIN: header looks like  "Bearer eyJhbGciOi..."
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            // EXPLAIN: bad signature, edited payload, or expired
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        // BOARD: req.user is the payload we signed at login
        req.user = user;
        next();   // EXPLAIN: hand off to the route
    });
}

// Protected route: only the logged in user's posts
app.get('/posts', authenticateToken, (req, res) => {
    console.log(`Verified user: ${req.user.name}`);
    res.json(posts.filter(post => post.userName === req.user.name));
});

// START: login route
app.post('/login', (req, res) => {
    const userName = req.body.userName;
    if (!userName) {
        // EXPLAIN: return stops the function; 400 = bad request
        return res.status(400).json({ error: 'userName is required' });
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
