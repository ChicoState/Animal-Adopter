import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoginPage from '../components/LoginFormComponent';

jest.mock('axios');

const history = createMemoryHistory();

describe('LoginPage', () => {
    beforeEach(() => {
      localStorage.clear(); // Clear local storage before each test
    });
  
    it('renders login form initially', () => {
      render(
        <Router history={history}>
          <LoginPage />
        </Router>
      );
      expect(screen.getByText('Login to Your Account')).toBeInTheDocument();
      expect(screen.getByLabelText('Username:')).toBeInTheDocument();
      expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    });

    it('handles login successfully', async () => {
        axios.post.mockResolvedValue({ data: { token: 'fakeToken123' } });
        render(
          <Router history={history}>
            <LoginPage />
          </Router>
        );
        fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'testUser' } });
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Log In'));
      
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/login/', {
            username: 'testUser',
            password: 'password123',
            email: ''  // Include this line as it's part of the credentials object
          });
          expect(localStorage.getItem('token')).toBe('fakeToken123');
          expect(history.location.pathname).toBe('/');
        });
      });

      it('displays error message on login failure', async () => {
        axios.post.mockRejectedValue(new Error('Failed to login'));
        render(
          <Router history={history}>
            <LoginPage />
          </Router>
        );
        fireEvent.click(screen.getByText('Log In'));
        await waitFor(() => {
          expect(screen.getByText('Login failed. Please check your username and password and try again.')).toBeInTheDocument();
        });
      });

      it('handles signup successfully', async () => {
        axios.post.mockResolvedValue({ data: { token: 'fakeToken456' } });
        render(
          <Router history={history}>
            <LoginPage />
          </Router>
        );
        fireEvent.click(screen.getByText('Sign Up'));
        fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'newUser' } });
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'newuser@example.com' } });
        fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'newpass123' } });
        fireEvent.click(screen.getByText('Sign Up'));
      
        await waitFor(() => {
          expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/signup/', {
            username: 'newUser',
            email: 'newuser@example.com',
            password: 'newpass123'
          });
          expect(localStorage.getItem('token')).toBe('fakeToken456');
          expect(history.location.pathname).toBe('/createProfile');
        });
      });
  });
  
