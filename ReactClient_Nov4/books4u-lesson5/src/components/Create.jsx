import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Create() {
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
// CHANGED: fields now match the books table -- price is gone
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [pages, setPages] = useState('')
    const [year, setYear] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
// NOTE: input type='number' still returns a string -- convert it
        const newBook = {
            title,
            author,
            pages: Number(pages),
            year: Number(year)
        }
        setIsPending(true)
        try {
            const res = await fetch(`${BASE_URL}/api/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBook)
            })
            if (!res.ok) {
// CHANGED: Express sends { error: '...' } -- read it and show it
                const body = await res.json().catch(() => ({}))
                throw new Error(body.error || `POST failed: ${res.status}`)
            }
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
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