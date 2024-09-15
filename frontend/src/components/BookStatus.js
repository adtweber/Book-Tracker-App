import React, { useState } from 'react'
import axios from 'axios'

const BookStatus = ({ bookId, initialStatus }) => {
    const [status, setStatus] = useState(initialStatus)

    // Function to handle status change and send it to the backend
    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus); // Update status locally

        try {
            // Update status in the backend
            const response = await axios.put(`/api/books/${bookId}/status`, { status: newStatus })
            console.log('Status updated:', response.data)
        } catch (error) {
            console.error('Error updating status:', error)
        }
    };

    return (
        <div>
            <p>Current Status: {status}</p>
            <div>
                <button
                    onClick={() => handleStatusChange('Want to Read')}
                    disabled={status === 'Want to Read'}
                >
                    Want to Read
                </button>
                <button
                    onClick={() => handleStatusChange('Reading')}
                    disabled={status === 'Reading'}
                >
                    Reading
                </button>
                <button
                    onClick={() => handleStatusChange('Read')}
                    disabled={status === 'Read'}
                >
                    Read
                </button>
            </div>
        </div>
    )
}

export default BookStatus