require('dotenv').config()
const express = require('express')
const jwt     = require('jsonwebtoken')
const cors    = require('cors')
const bcrypt  = require('bcrypt')
const pool    = require('./util/database')

const app = express()
app.use(express.json())
app.use(cors())

const posts = [
    { userName: 'Herman',  title: 'My favorite Scare Tactics' },
    { userName: 'GrandPa', title: 'GrandPa is scary' },
    { userName: 'Jake',    title: 'Jakes Theory on the Munsters' }
]

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'No token provided' })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' })
        }
        req.user = user
        next()
    })
}

app.get('/posts', authenticateToken, (req, res) => {
    console.log(`Verified user: ${req.user.name}`)
    res.json(posts.filter(post => post.userName === req.user.name))
})

app.post('/login', async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password)
        return res.status(400).json({ error: 'userName and password are required' })

    try {
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [userName]
        )
        if (rows.length === 0)
            return res.status(401).json({ error: 'Unknown user' })

        const user = rows[0]
        const match = await bcrypt.compare(password, user.password_hash)
        if (!match)
            return res.status(401).json({ error: 'Invalid password' })

        const accessToken = jwt.sign(
            { name: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        )
        res.json({ accessToken })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})
