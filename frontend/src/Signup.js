import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            // Replace this with your actual signup logic
            console.log('Signing up with:', { username, password });
            // Simulate successful signup logic and redirect to login page
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('Signup error:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;
