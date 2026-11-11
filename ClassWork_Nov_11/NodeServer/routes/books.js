// routes/books.js
// All five CRUD routes plus search -- mysql2 with parameterized queries
const express = require('express')
const router = express.Router()
const pool = require('../util/database')
const validateBook = require('../util/validateBook')

// GET all books
router.get('/books', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books')
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET search by title -- must come BEFORE /books/:id
router.get('/books/search/:term', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE title LIKE ?',
            [`%${req.params.term}%`]
        )
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET single book by id
router.get('/books/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE id = ?',
            [req.params.id]
        )
        if (rows.length === 0) return res.status(404).json({ error: 'Book not found' })
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// POST -- create a new book
router.post('/books', async (req, res) => {
    const error = validateBook(req.body)
    if (error) return res.status(400).json({ error })

    const { title, pages, author, year, num_sold } = req.body
    try {
        const [result] = await pool.query(
            'INSERT INTO books (title, pages, author, year, num_sold) VALUES (?, ?, ?, ?, ?)',
            [title, parseInt(pages), author, parseInt(year), num_sold || 0]
        )
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE id = ?', [result.insertId]
        )
        res.status(201).json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// PUT -- update an existing book
router.put('/books/:id', async (req, res) => {
    const error = validateBook(req.body)
    if (error) return res.status(400).json({ error })

    const { title, pages, author, year, num_sold } = req.body
    const id = parseInt(req.params.id)
    try {
        const [result] = await pool.query(
            'UPDATE books SET title=?, pages=?, author=?, year=?, num_sold=? WHERE id=?',
            [title, parseInt(pages), author, parseInt(year), parseInt(num_sold), id]
        )
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Book not found' })
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE id = ?', [id]
        )
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// DELETE -- remove a book
router.delete('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE id = ?', [id]
        )
        if (rows.length === 0) return res.status(404).json({ error: 'Book not found' })
        await pool.query('DELETE FROM books WHERE id = ?', [id])
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
