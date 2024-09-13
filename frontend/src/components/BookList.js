import React from 'react'

const BookList = ({ books }) => {
    return (
        <div>
            <h2>Your Books</h2>
            {books.length > 0 ? (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p>Status: {book.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books here!</p>
            )}
        </div>
    )
}

export default BookList