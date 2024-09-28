import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUser } from './CurrentUser';
import { Navbar, Nav, Container } from 'react-bootstrap'

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
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/home">Home</Link>
                        <Link to="/booklist">Book List</Link>
                        <Link to="/search">Search</Link>
                    </Nav>
                </Container>
            </Navbar>
            </>
        );
    }

export default Header
