// routes/books.js
const express = require('express')
const router  = express.Router()
const pool    = require('../util/database')

// GET all books from the database
router.get('/books', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books')
        res.json(rows)
    } catch (err) {
        console.error('Database error:', err.message)
        res.status(500).json({ error: 'Database error' })
    }
})
router.get('/books/bestseller', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM books ORDER BY num_sold DESC LIMIT 1'
        )
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: 'Database error' })
    }
})
// GET single book by id
router.get('/books/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE id = ?',
            [req.params.id]
        )
        if (rows.length === 0) return res.status(404).json({ error: 'Book not found!!!!'+req.params.id })
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: 'Database error' })
    }
})
router.get('/books/search/:term', async (req, res) => {
            console.log('SEARCH HIT', req.params.term)  // add this
            try {
                const [rows] = await pool.query(
                    'SELECT * FROM books WHERE title  LIKE ?',
                    [`%${req.params.term}%`]
                )
                res.json(rows)
            } catch (err) {
                res.status(500).json({ error: 'FL1: Database error:' + err.message})
            }
        })



module.exports = router
