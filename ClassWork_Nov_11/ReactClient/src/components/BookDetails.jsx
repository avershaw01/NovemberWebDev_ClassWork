// src/components/BookDetails.jsx
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from './useFetch'

function BookDetails() {

    const { id }   = useParams()      // get id from URL
    const navigate = useNavigate()    // for programmatic navigation
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const url      = `${BASE_URL}/api/books/${id}`

    // useFetch fetches the single book at this URL
    // url is in useFetch dependency array so it refetches when id changes
    const { data, error, isPending } = useFetch(url)

    // JSON Server returns a single object for /books/:id -- not an array
    const book = data && !Array.isArray(data) ? data : null

    const handleDelete = async () => {
        // Confirm before deleting -- returns true if user clicks OK
        const ok = window.confirm('Are you sure you want to delete this book?')
        if (!ok) return   // user cancelled -- exit without deleting

        try {
            const res = await fetch(url, {
                method: 'DELETE'
                // No body or Content-Type header needed for a simple DELETE
            })
            if (!res.ok) {
                throw new Error(`Delete failed (status ${res.status})`)
            }
            // Delete succeeded -- navigate back to the book list
            navigate('/')
        } catch (err) {
            alert(`Error deleting book: ${err.message}`)
        }
    }

    return (
        <div>
            <h2>Book Details {id}</h2>
            <p>The book you seek has id = {id}</p>

            {isPending && <div>Loading ...</div>}
            {error && <div className='text-danger'>{error}</div>}

            {book && (
                <>
                    <table className='table table-striped table-bordered text-center'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Pages</th>
                                <th>Year</th>
                                <th>Num Sold</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.pages}</td>
                                <td>{book.year}</td>
                                <td>{book.num_sold}</td>
                            </tr>
                        </tbody>
                    </table>

                    <button
                        type='button'
                        className='btn btn-danger mt-3'
                        onClick={handleDelete}
                    >
                        Delete This Book
                    </button>
                </>
            )}
        </div>
    )
}

export default BookDetails
