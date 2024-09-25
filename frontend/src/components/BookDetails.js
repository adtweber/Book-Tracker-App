import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // To get book ID from the URL

const BookDetails = () => {
    const { id } = useParams(); // Get book ID from the URL
    const [book, setBook] = useState(null);  // Store the book details
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch book details by ID
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`/api/books/${id}`);
                setBook(response.data); // Store the book details in state
                setLoading(false); // Stop loading once data is fetched
            } catch (error) {
                console.error('Error fetching book details:', error);
                setLoading(false); // Stop loading even if there is an error
            }
        };

        fetchBookDetails();
    }, [id]); // Dependency array ensures this runs when the component loads

    // Function to handle the book status change
    const handleStatusChange = async (newStatus) => {
        try {
            await axios.put(`/api/books/${id}/status`, { status: newStatus });
            setBook((prevBook) => ({ ...prevBook, status: newStatus }));
        } catch (error) {
            console.error('Error updating book status:', error);
        }
    };

    if (loading) return <div>Loading book details...</div>;

    return (
        <div className="container mt-4">
            {book ? (
                <div>
                    <h1>{book.title}</h1>
                    <h2>{book.author}</h2>
                    <p>{book.description}</p>

                    {/* Status Toggle Buttons */}
                    <div className="btn-group" role="group">
                        <button
                            className={`btn btn-outline-primary ${book.status === 'Want to Read' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('Want to Read')}
                        >
                            Want to Read
                        </button>
                        <button
                            className={`btn btn-outline-warning ${book.status === 'Reading' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('Reading')}
                        >
                            Reading
                        </button>
                        <button
                            className={`btn btn-outline-success ${book.status === 'Finished' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('Finished')}
                        >
                            Finished
                        </button>
                    </div>
                </div>
            ) : (
                <div>Book not found</div>
            )}
        </div>
    );
};

export default BookDetails;
