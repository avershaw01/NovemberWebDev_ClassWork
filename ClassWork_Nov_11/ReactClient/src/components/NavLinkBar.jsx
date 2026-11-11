import { NavLink, useNavigate } from 'react-router-dom'
function getUsername() {
    const token = localStorage.getItem('accessToken')
    if (!token) return null
    try {
        return JSON.parse(atob(token.split('.')[1])).name
    } catch {
        return null
    }
}
function NavLinkBar() {
    const navigate = useNavigate()
    const username = getUsername()
    function handleLogout() {
        localStorage.removeItem('accessToken')
        navigate('/login')
    }
    return (
        <nav className='navbar navbar-expand navbar-dark bg-dark px-3'>
            <span className='navbar-brand'>Books 4 U</span>
            <div className='navbar-nav ms-auto d-flex align-items-center gap-3'>
                <NavLink to='/' end className='nav-link'>Home</NavLink>
                <NavLink to='/create' className='nav-link'>Create</NavLink>
                <NavLink to='/about' className='nav-link'>About</NavLink>
                {username && (
                    <>
                        <span className='text-white'>Hello, {username}</span>
                        <button className='btn btn-outline-light btn-sm'
                                onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}
export default NavLinkBar