import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BookStatus from './BookStatus'

const BookList = () => {
    const [books, setBooks] = useState([]);

    // Fetch the saved books from the backend
    useEffect(() => {
        const fetchSavedBooks = async () => {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
            
            try {
                const response = await axios.get('http://localhost:5000/mybooks/', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Attach token in Authorization header
                    }
                });
                setBooks(response.data);  // Assuming the backend returns a list of saved books
            } catch (error) {
                console.error('Error fetching saved books', error);
            }
        };
    
        fetchSavedBooks();
    }, []);

    return (
        <div>
            <h2>Your Books</h2>
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <img src={book.cover} alt=""></img>
                            <p>Author: {book.author}</p>
                            <p>Status: {book.status}</p>
                            <BookStatus bookId={book.id} initialStatus={book.status} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books here!</p>
            )}
        </div>
    );
};

export default BookList;
