import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loggedInEmail, setLoggedInEmail] = useState('');

    useEffect(() => {
        // Перевірка, чи користувач вже залогінений
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setLoggedInEmail(storedEmail);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email); // Зберігаємо email у localStorage
            setError('');
            setSuccess('Login successful!'); 
            setLoggedInEmail(email); // Встановлюємо email для відображення
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            setSuccess('');
            console.error(err);
        }
    };

    return (
        <div>
            {loggedInEmail ? (
                <div>
                    <h2>You are logged in as {loggedInEmail}</h2>
                    <button onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('email');
                        setLoggedInEmail('');
                    }}>
                        Logout
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;
