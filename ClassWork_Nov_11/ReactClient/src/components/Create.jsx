// src/components/Create.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Create() {

    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_API_BASE_URL

    // One useState per form field -- all start as empty strings
    // Controlled inputs -- React holds the current value in state
    const [title,  setTitle]  = useState('')
    const [author, setAuthor] = useState('')
    // const [price,  setPrice]  = useState('')
    const [pages,     setPages]     = useState('')
    const [year,      setYear]      = useState('')


    // isPending -- true while POST is in progress
    // Disables submit button to prevent double submission
    const [isPending, setIsPending] = useState(false)

    // error -- null normally, set to message string if POST fails
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        // Prevent browser default form submission which reloads the page
        e.preventDefault()

        // Build the new book object from form field state
        const newBook = {
            title,
            author,
            pages: Number(pages),
            year:  Number(year)
        }

        setIsPending(true)   // disable button, show Saving...

        try {
            const res = await fetch(`${BASE_URL}/api/books`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(newBook)
            })
            if (!res.ok) {
                // throw new Error(`POST failed: ${res.status}`)
                const body = await res.json().catch(() => ({}))
                throw new Error(body.error || `POST failed: ${res.status}`)

            }
            // POST succeeded -- navigate back to the book list
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            // finally always runs -- success or failure
            // Re-enable the button regardless of outcome
            setIsPending(false)
        }
    }

    return (
        <div className='container mt-3'>
            <h2>Create a New Book</h2>

            {error && <div className='alert alert-danger'>{error}</div>}

            <form onSubmit={handleSubmit} className='mt-3'>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        type='text'
                        className='form-control'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Author</label>
                    <input
                        type='text'
                        className='form-control'
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Pages</label>
                    <input
                        type='number'
                        className='form-control'
                        required
                        min='1'
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Year</label>
                    <input
                        type='number'
                        className='form-control'
                        required
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={isPending}
                >
                    {isPending ? 'Saving...' : 'Save Book'}
                </button>

            </form>
        </div>
    )
}

export default Create
