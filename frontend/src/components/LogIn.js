import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CurrentUser } from "./CurrentUser"

const Login = () => {

    const { setCurrentUser } = useContext(CurrentUser)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/', 
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
    

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login