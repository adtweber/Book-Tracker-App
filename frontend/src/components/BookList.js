import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    // Function to fetch books from the backend API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    // Define the handleStatusChange function inside the component
    const handleStatusChange = async (bookId, newStatus) => {
        try {
            await axios.put(`/api/books/${bookId}/status`, { status: newStatus });

            // Update the state to reflect the new status
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookId ? { ...book, status: newStatus } : book
                )
            );
        } catch (error) {
            console.error('Error updating book status:', error);
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
                                        onClick={() => handleStatusChange(book.id, 'Want to Read')}
                                    >
                                        Want to Read
                                    </button>
                                    <button
                                        className={`btn btn-outline-warning ${book.status === 'Reading' ? 'active' : ''}`}
                                        onClick={() => handleStatusChange(book.id, 'Reading')}
                                    >
                                        Reading
                                    </button>
                                    <button
                                        className={`btn btn-outline-success ${book.status === 'Finished' ? 'active' : ''}`}
                                        onClick={() => handleStatusChange(book.id, 'Finished')}
                                    >
                                        Finished
                                    </button>
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
