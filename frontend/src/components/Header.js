import React, { useContext, useState,  } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CurrentUser } from './CurrentUser';

const Header = () => {

    const { setCurrentUser } = useContext(CurrentUser);
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/logout/', {}, {
                headers: {
                    'Content-Type': 'application/json',  
                }
        });
        setCurrentUser(null);
        navigate('/');
        } catch (err) {
            setError('Could Not Logout');
            alert('An error occurred while logging out. Please try again.');
        }
    };
    
    return (
        <header>
        <h1>Andi & Judd's Book Tracker</h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {CurrentUser ? (
                    <>
                        <li><Link to="/search">Search Books</Link></li>
                        <li><Link to="/addbook">Add Books</Link></li>
                        <li><Link to="/booklist">My Books</Link></li>
                        <li>Welcome, {CurrentUser.email}!</li>
                        <button onClick={handleLogout}>Logout</button>
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