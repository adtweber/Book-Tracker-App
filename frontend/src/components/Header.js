import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUser } from './CurrentUser';

const Header = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUser);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Handle the logout functionality
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setCurrentUser(null);
        navigate('/login');
    };

    // Handle the search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Redirect to the search page with the query as a parameter
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* Brand */}
                    <Link className="navbar-brand" to="/">Andi & Judd's Book Tracker</Link>

                    {/* Mobile toggle button */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {currentUser ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/search">Search Books</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/addbook">Add Books</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/booklist">My Books</Link>
                                    </li>
                                    <li className="nav-item">
                                        <span className="navbar-text">Welcome, {currentUser.email}!</span>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Log In</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Sign Up</Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        {/* Search Form */}
                        {currentUser && (
                            <form className="d-flex ms-auto" onSubmit={handleSearch}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search books"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
