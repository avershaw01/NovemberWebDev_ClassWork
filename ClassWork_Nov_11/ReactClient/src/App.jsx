// src/App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavLinkBar  from './components/NavLinkBar'
import BookHome    from './components/BookHome'
import BookDetails from './components/BookDetails'
import Create      from './components/Create'
import About       from './components/About'

function App() {
    return (
        <>
            <NavLinkBar />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h2>Books 4 U</h2>
                    </div>
                    <div className='col-md-6'>
                        <Routes>
                            <Route path='/'                element={<BookHome />} />
                            <Route path='/about'           element={<About />} />
                            <Route path='/BookDetails/:id' element={<BookDetails />} />
                            <Route path='/create'          element={<Create />} />
                            <Route path='*'                element={<h2>404 - Page Not Found</h2>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
