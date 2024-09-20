import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const handleDelete = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/login/', 
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',  
                }
            }
        );

        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            setCurrentUser(response.data.user);
            navigate('/');
        }
    } catch (err) {
        setError('Invalid email or password. Please try again.');
    }
};

