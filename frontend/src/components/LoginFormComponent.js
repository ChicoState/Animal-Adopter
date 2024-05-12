import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [form, setForm] = useState('login'); // Controls whether the login or signup form is displayed
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(''); // State to store the logged-in username
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username'); // Retrieve the username from local storage
        if (token && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
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
            localStorage.setItem('username', credentials.username); // Save the username to localStorage
            setIsLoggedIn(true);
            setUsername(credentials.username); // Set the username in the state
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
            localStorage.setItem('username', credentials.username); // Save the username to localStorage
            setIsLoggedIn(true);
            setUsername(credentials.username); // Set the username in the state
            history.push('/createProfile'); // Redirect to profile creation
        } catch (error) {
            setError('Registration failed, the username may be taken. Please try again with a new username.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        localStorage.removeItem('username'); // Remove the username from localStorage
        setIsLoggedIn(false);
        setUsername(''); // Clear the username state
        history.push('/login'); // Redirect back to the login page
    };

    return (
        <div className="auth-forms-container">
            {isLoggedIn ? (
                <div>
                    <h2>Hello, {username}! Would you like to log out?</h2>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <>
                    {form === 'login' ? (
                        <div className="auth-forms-container">
                        <form className="login-form" onSubmit={handleLogin}>
                          <h2>Login to Your Account</h2>
                          <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                              id="username"
                              type="text"
                              name="username"
                              value={credentials.username}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                              id="password"
                              type="password"
                              name="password"
                              value={credentials.password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <button type="submit">Log In</button>
                          <p>
                            Don't have an account? 
                            <button type="button" onClick={() => setForm('signup')}>Sign Up</button>
                          </p>
                        </form>
                      </div>
                    ) : (
                        <div className="auth-forms-container">
                            <form className="signup-form" onSubmit={handleSignup}>
                                <h2>Create Your Account</h2>
                                <div className="form-group">
                                <label htmlFor="signup-username">Username:</label>
                                <input
                                    id="signup-username"
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="form-group">
                                <label htmlFor="signup-email">Email:</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="form-group">
                                <label htmlFor="signup-password">Password:</label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
    <button type="submit">Sign Up</button>
    <p>
      Already have an account? 
      <button type="button" onClick={() => setForm('login')}>Log In</button>
    </p>
  </form>
</div>
)}
    </>)}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default LoginPage;