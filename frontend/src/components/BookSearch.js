import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
            setBooks(response.data.items || []);
        } catch (error) {
            console.error('Error fetching data from Google Books', error)
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
            <button onClick={fetchBooks}></button>

            <div>
                {books.length > 0 ? (
                    <ul>
                        {books.map((book) => (
                            <li key={book.id}>
                                <h3>
                                    <Link to={`/books/${book.id}`}>{book.volumeInfo.title}</Link>
                                </h3>
                                <p>{book.volumeInfo.authors?.join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    )
}

export default BookSearch