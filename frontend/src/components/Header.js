import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { CurrentUser } from './CurrentUser';
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { currentUser, setCurrentUser } = useContext(CurrentUser);

    const navigate = useNavigate();  // For navigation

    const handleLogout = () => {
        // Clear token and user from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        // Update the current user context to null
        setCurrentUser(null);

        // Redirect to the login page
        navigate('/login');
    };

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
                        <li><button onClick={handleLogout}>Logout</button></li>
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