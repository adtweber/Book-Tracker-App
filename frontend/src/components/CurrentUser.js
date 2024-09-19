import { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const CurrentUser = createContext()

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            // Fetch the current user from the backend using the token
            axios.get('http://localhost:5000/login/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`  // Send the token
                }
            }).then(response => {
                setCurrentUser(response.data.user);  // Set the user from response
            }).catch(error => {
                console.error('Token is invalid or expired', error);
                localStorage.removeItem('authToken');  // Remove invalid token
            });
        }
    }, []);  // Run only on component mount

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}

export default CurrentUserProvider