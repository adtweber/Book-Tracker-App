import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    // Function to fetch books from the backend API
    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem('authToken'); 
    
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/books', {
                        headers: {
                            'Authorization': `Bearer ${token}`  
                        }
                    });
                    setBooks(response.data);  
                } catch (error) {
                    console.error('Error fetching books:', error);  // Handle errors
                }
            } else {
                console.error('No token found, please log in again');
            }
        };

        fetchBooks();
    }, []);

    // Define the handleStatusChange function inside the component
    const handleStatusChange = async (bookId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/books/${bookId}`, { status: newStatus });

            // Update the state to reflect the new status
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.bookId === bookId ? { ...book, status: newStatus } : book
                )
            );
        } catch (error) {
            console.error('Error updating book status:', error);
        }
    };

    const handleDelete = async (bookId) => {
        console.log('Deleting book with ID:', bookId);  
        try {
            const response = await axios.delete(`http://localhost:5000/books/${bookId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
    
            if (response.status === 200) {
                console.log('Book deleted successfully');
                // Update the books list after deletion
                setBooks((prevBooks) => prevBooks.filter((book) => book.bookId !== bookId));
            }
        } catch (err) {
            console.error('Error deleting book:', err);
        }
    };
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">My Book List</h1>

            {/* Book List */}
            <div className="row">
                {books.map((book) => (
                    <div key={book.id} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                                <p className="card-text">{book.description}</p>

                                {/* Status Toggle Buttons */}
                                <div className="btn-group" role="group">
                                    <button
                                        className={`btn btn-outline-primary ${book.status === 'Want to Read' ? 'active' : ''}`}
                                        onClick={() => handleStatusChange(book.bookId, 'Want to Read')}
                                    >
                                        Want to Read
                                    </button>
                                    <button
                                        className={`btn btn-outline-warning ${book.status === 'Reading' ? 'active' : ''}`}
                                        onClick={() => handleStatusChange(book.bookId, 'Reading')}
                                    >
                                        Reading
                                    </button>
                                    <button
                                        className={`btn btn-outline-success ${book.status === 'Finished' ? 'active' : ''}`}
                                        onClick={() => handleStatusChange(book.bookId, 'Finished')}
                                    >
                                        Finished
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        console.log("Deleting book with ID:", book.bookId);  
                                        handleDelete(book.bookId);
                                    }}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
