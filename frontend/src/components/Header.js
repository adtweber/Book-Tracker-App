import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
        <h1>Andi & Judd's Book Tracker</h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {currentUser ? (
                    <>
                        <li><Link to="/search">Search Books</Link></li>
                        <li><Link to="/addbook">Add Books</Link></li>
                        <li><Link to="/booklist">My Books</Link></li>
                        <li>Welcome, {currentUser.email}!</li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    </header>
    )
}

export default Header