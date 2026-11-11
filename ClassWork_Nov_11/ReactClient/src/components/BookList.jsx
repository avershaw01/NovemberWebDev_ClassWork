// src/components/BookList.jsx
import { useNavigate } from 'react-router-dom'

function BookList({ books, title }) {

    const navigate = useNavigate()

    // Navigate to BookDetails for this book
    const handleButtonDetails = (id) => {
        navigate(`/BookDetails/${id}`)
    }

    // Navigate to the Create page
    const handleButtonCreate = () => {
        navigate('/create')
    }

    return (
        <div>
            <h3>Sub Title: {title}</h3>

            {/* Create New Book button above the table */}
            <button
                type='button'
                className='btn btn-success mb-3'
                onClick={handleButtonCreate}
            >
                Create New Book
            </button>

            <table className='table table-striped table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <button
                                    type='button'
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleButtonDetails(book.id)}
                                >
                                    Details {book.id}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BookList
