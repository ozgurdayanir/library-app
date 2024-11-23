import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.style.css'

function Header() {
  return (
    <nav className='main-nav'>
      <ul className='nav-list'>
        <li className='nav-item'><NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
        <li className='nav-item'><NavLink to="/books" className={({ isActive }) => isActive ? 'active-link' : ''}>Books</NavLink></li>
        <li className='nav-item'><NavLink to="/authors" className={({ isActive }) => isActive ? 'active-link' : ''}>Authors</NavLink></li>
        <li className='nav-item'><NavLink to="/publishers" className={({ isActive }) => isActive ? 'active-link' : ''}>Publishers</NavLink></li>
        <li className='nav-item'><NavLink to="/categories" className={({ isActive }) => isActive ? 'active-link' : ''}>Categories</NavLink></li>
        <li className='nav-item'><NavLink to="/book-borrowing" className={({ isActive }) => isActive ? 'active-link' : ''}>Book Borrowing</NavLink></li>
      </ul>
    </nav>
  )
}

export default Header