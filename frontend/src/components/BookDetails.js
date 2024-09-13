import React from 'react'

const BookDetails = ({ book }) => {
    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.authors?.join(', ')}</p>
            <p>Description: {book.description}</p>
            <button>Add to my Book List</button>
        </div>
    )
}

export default BookDetails