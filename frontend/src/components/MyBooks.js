import React, { useState } from 'react'

function books() {
	const [books, setBooks] = useState([]);

	// FETCH all games from the server on component mount //
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}mybooks`);
			const resData = await response.json();
			setBooks(resData);
		};
		fetchData();
	}, []);

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