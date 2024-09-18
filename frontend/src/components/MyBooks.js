import React, { useState } from 'react'

function books() {
	const [books, setBooks] = useState([]);

	// FETCH all books from the server on component mount //
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/mybooks/`);
			const resData = await response.json();
			setBooks(resData);
		};
		fetchData();
	}, []);

    let booksFormatted = books.map((book) => (
        <li key={book.id}>
            <h3>{book.title}</h3>
            <img src={book.cover} alt="" />
            <p>Author: {book.author}</p>
            <p>Status: {book.status}</p>
            <BookStatus bookId={book.id} initialStatus={book.status} />
        </li>
    ));

	return (
		<div>
			<h1>MyBooks</h1>
			<div className="row">
				{booksFormatted}
			</div>
		</div>
	)
};

export default books