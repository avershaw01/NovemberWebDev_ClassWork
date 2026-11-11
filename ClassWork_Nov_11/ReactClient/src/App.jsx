import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavLinkBar from './components/NavLinkBar'
import BookHome from './components/BookHome'
import BookDetails from './components/BookDetails'
import Create from './components/Create'
import About from './components/About'
import Login from './components/Login'
function RequireAuth({ children }) {
    const token = localStorage.getItem('accessToken')
    if (!token) return <Navigate to="/login" replace />
    return children
}
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
                            <Route path='/' element={<BookHome />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/BookDetails/:id' element={<BookDetails />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/create' element={
                                <RequireAuth><Create /></RequireAuth>
                            } />
                            <Route path='*' element={<h2>404 - Page Not Found</h2>}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}
export default App