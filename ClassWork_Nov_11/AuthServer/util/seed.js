require('dotenv').config()
const bcrypt = require('bcrypt')
const pool   = require('./database')

const SALT_ROUNDS = 10

const users = [
    { username: 'Herman',  password: 'password123' },
    { username: 'GrandPa', password: 'password123' },
    { username: 'Jake',    password: 'password123' },
]

async function seed() {
    for (const user of users) {
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS)
        await pool.query(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [user.username, hash]
        )
        console.log(`Inserted ${user.username}`)
    }
    console.log('Done')
    process.exit(0)
}

seed()
