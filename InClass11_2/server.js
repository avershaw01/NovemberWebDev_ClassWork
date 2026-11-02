// server.js
const express    = require('express')
const cors       = require('cors')
const app        = express()
const booksRouter = require('./routes/books')

app.use(cors())
app.use(express.json())
app.use('/api', booksRouter)

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Books API running on http://localhost:${PORT}`)
})
