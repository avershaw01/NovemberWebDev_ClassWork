// src/components/NavLinkBar.jsx
import { NavLink } from 'react-router-dom'

function NavLinkBar() {
    return (
        <nav className='navbar navbar-expand navbar-dark bg-dark px-3'>
            <span className='navbar-brand'>Books 4 U</span>
            <div className='navbar-nav ms-auto'>
                <NavLink to='/'       end className='nav-link'>Home</NavLink>
                <NavLink to='/create'     className='nav-link'>Create</NavLink>
                <NavLink to='/about'      className='nav-link'>About</NavLink>
            </div>
        </nav>
    )
}

export default NavLinkBar
