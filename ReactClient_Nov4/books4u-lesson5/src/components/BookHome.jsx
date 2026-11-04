// src/components/BookHome.jsx
import useFetch from './useFetch'
import BookList from './BookList'

function BookHome() {

    const title = 'My Book List'
    const BASE_URL = import.meta.env.VITE_API_BASE_URL

    // useFetch handles useState, useEffect, and error handling internally
    const { data, isPending, error } = useFetch(`${BASE_URL}/api/books`)

    // data is null until fetch completes -- Array.isArray guards against null
    const books = Array.isArray(data) ? data : []

    return (
        <div>
            {isPending && <div className='text-muted'>Loading ...</div>}
            {error && <div className='text-danger'>{String(error)}</div>}

            {/* Pass books to BookList only when data has arrived */}
            {books.length > 0 && (
                <BookList books={books} title={title} />
            )}
        </div>
    )
}

export default BookHome
