import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BookDetails = ({ books }) => {
    const { id } = useParams()
    const [book, setBook] = useState(null);

    useEffect(() => {
        const foundBook = books.find(b => b.id === id);
        setBook(foundBook);
    }, [id, books]);

    if (!book) {
        return <p>Loading book details...</p>;
    }

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.authors?.join(', ')}</p>
            <p>Description: {book.description}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Published Date: {book.publishedDate}</p>
        </div>
    );
};

export default BookDetails