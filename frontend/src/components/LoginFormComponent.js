import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [form, setForm] = useState('login'); // 'login' or 'signup'
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const history = useHistory();

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
            console.log("Logged in successfully:", response.data); // Process login success
            history.push('/'); // Redirect to a protected route
        } catch (error) {
            setError('Login failed. Please check your username and password and try again.');
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/signup/', credentials);
            console.log("Registered successfully"); // Optionally, directly log the user in
            history.push('/createProfile'); // Redirect after signup
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="auth-forms-container">
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
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default LoginPage;
