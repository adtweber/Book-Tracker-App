import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            setBooks(response.data.items || []);
        } catch (error) {
            console.error('Error fetching data from Google Books', error);
        }
    };

    const addBook = async (book) => {
        const newBook = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors?.join(', ') || 'Unknown Author',
            cover: book.volumeInfo.imageLinks?.thumbnail, // Added optional chaining
            status: 'Want to Read',  // Customize the status as per your app's requirement
        };

        try {
            const response = await axios.post('http://localhost:5000/mybooks/', newBook, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,  // Include this to send the session cookie
            });
            console.log('Book added:', response.data);
        } catch (error) {
            console.error('Error saving book to the database', error);
        }
    };

    return (
        <div>
            <h2>Search for Books</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter title or author"
            />
            <button onClick={fetchBooks}>Search</button>

            <div>
                {books.length > 0 ? (
                    <ul>
                        {books.map((book) => (
                            <li key={book.id}>
                                <h3>
                                    <Link to={`/books/${book.id}`}>{book.volumeInfo.title}</Link>
                                </h3>
                                <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
                                <p>{book.volumeInfo.authors?.join(', ')}</p>
                                <button onClick={() => addBook(book)}>Save to My Books</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    );
};

export default BookSearch;