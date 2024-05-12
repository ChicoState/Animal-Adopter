import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import UserFormComponent from '../components/UserFormComponent';

jest.mock('axios');

describe('UserFormComponent', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
    axios.post.mockResolvedValue({ data: { success: true, id: 123 }, status: 200 });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the user form with initial state correctly', async () => {
    render(
      <Router>
        <UserFormComponent />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Age:')).toBeInTheDocument();
      expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
      expect(screen.getByLabelText('Location:')).toBeInTheDocument();
      expect(screen.getByLabelText('Contact:')).toBeInTheDocument();
      expect(screen.getByLabelText('Profile Image:')).toHaveValue('');
    });
  });
  
  it('handles form submission correctly', async () => {
    render(
      <Router>
        <UserFormComponent />
      </Router>
    );

    const nameInput = screen.getByLabelText('Name:');
    const ageInput = screen.getByLabelText('Age:');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(ageInput, { target: { value: '30' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check for a success message or other indicators of successful submission
      expect(screen.getByText(/Profile updated successfully!/i)).toBeInTheDocument();
    });
  });
});
