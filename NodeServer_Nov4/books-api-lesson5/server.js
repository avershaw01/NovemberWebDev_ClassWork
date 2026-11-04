// server.js
// Load .env FIRST -- before anything reads process.env
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const booksRouter = require('./routes/books')

const app = express()

// app.use(cors())
app.use( cors({ origin:process.env.CLIENT_ORIGIN}))
app.use(express.json())

app.use((req, res, next) => { console.log(req.method, req.url); next() })
// All books routes live under /api -- e.g. /api/books
app.use('/api', booksRouter)

// Any route not matched above -- JSON 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Books API running on http://localhost:${PORT}`)
})