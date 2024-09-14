import React, { useState } from 'react'

function books() {
	const [books, setBooks] = useState([]);

	// FETCH all games from the server on component mount //
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`http://localhost:5000/mybooks`);
			const resData = await response.json();
			setBooks(resData);
		};
		fetchData();
	}, []);

    const addBook = async (newBook) => {
        // Sending a POST request to add a new book
        const response = await fetch('http://localhost:5000/mybooks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Ensure the content type is JSON
            },
            body: JSON.stringify(newBook),  // Convert the newBook object to JSON
        });
    
        const result = await response.json();
        
        // Assuming the backend returns the newly created book, update the state
        setBooks([...books, result]);  // Add the new book to the current list of books
    };
    
    let booksFormatted = books.map((book) => (
		<div className="col-sm-6" key={books._id}>
			{/* <h2>
				<Link to={`/games/${game._id}`}>{game.title}</Link>
			</h2> */}
			<h4>
				<p>Platform: {book.title}</p>
			</h4>
		</div>
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