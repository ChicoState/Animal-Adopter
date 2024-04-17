import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [form, setForm] = useState('login'); // Controls whether the login or signup form is displayed
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        // Automatically check if the user is logged in when the component mounts
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', credentials);
            localStorage.setItem('token', response.data.token); // Save the token to localStorage
            setIsLoggedIn(true);
            history.push('/'); // Redirect to the homepage or dashboard
        } catch (error) {
            setError('Login failed. Please check your username and password and try again.');
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/signup/', credentials);
            localStorage.setItem('token', response.data.token); // Save the token to localStorage
            setIsLoggedIn(true);
            history.push('/createProfile'); // Redirect to profile creation
        } catch (error) {
            setError('Registration failed, the username may be taken. Please try again with a new username.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        history.push('/login'); // Redirect back to the login page
    };

    return (
        <div className="auth-forms-container">
            {isLoggedIn ? (
                <div>
                    <h2>Logout</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <>
                    {form === 'login' ? (
                        <form onSubmit={handleLogin} className="login-form">
                            <h2>Login to Your Account</h2>
                            <div className="form-group">
                                <label>Username:</label>
                                <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                            </div>
                            <button type="submit">Log In</button>
                            <p>Don't have an account? <button type="button" onClick={() => setForm('signup')}>Sign Up</button></p>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="signup-form">
                            <h2>Create Your Account</h2>
                            <div className="form-group">
                                <label>Username:</label>
                                <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                            </div>
                            <button type="submit">Sign Up</button>
                            <p>Already have an account? <button type="button" onClick={() => setForm('login')}>Log In</button></p>
                        </form>
                    )}
                </>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default LoginPage;
