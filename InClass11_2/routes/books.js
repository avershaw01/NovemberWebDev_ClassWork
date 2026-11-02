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
// POST /api/books -- create a new book
router.post('/books', async (req, res) => {
    const { title, pages, author, year, num_sold } = req.body

    // Validate required fields
    if (!title || !pages || !author || !year) {
        return res.status(400).json({ error: 'title, pages, author, and year are required' })
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO books (title, pages, author, year, num_sold) VALUES (?, ?, ?, ?, ?)',
            [title, parseInt(pages), author, parseInt(year), num_sold || 0]
        )
        // Fetch the newly created book using the auto-generated id
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [result.insertId])
        res.status(201).json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
// PUT /api/books/:id -- update an existing book
router.put('/books/:id', async (req, res) => {
    const { title, pages, author, year, num_sold } = req.body
    const id = parseInt(req.params.id)

    try {
        const [result] = await pool.query(
            'UPDATE books SET title=?, pages=?, author=?, year=?, num_sold=? WHERE id=?',
            [title, parseInt(pages), author, parseInt(year), parseInt(num_sold), id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Book not found' })
        }

        // Return the updated book
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id])
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
// DELETE /api/books/:id -- remove a book
router.delete('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        // Fetch the book first so we can return it in the response
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id])

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' })
        }

        await pool.query('DELETE FROM books WHERE id = ?', [id])
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router