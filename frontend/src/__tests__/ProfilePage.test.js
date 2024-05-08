import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import UserProfile from '../pages/profilePage';

jest.mock('axios');

describe('UserProfile Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: { name: 'John Doe', location: 'City', contact: 'Contact Info' }
    }).mockResolvedValueOnce({
      status: 200,
      data: [
        { name: 'Buddy', type: 'Dog', age: '5', price: '100', location: 'Park', contact: '12345', about: 'Friendly dog', image: '/path/to/image.jpg' }
      ]
    });

    window.localStorage.setItem('authToken', 'fake-token');
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  test('handles animal click to display details', async () => {
    render(<UserProfile username="testuser" />);
    
    // Ensure the page has completed initial loading
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const allBuddyTexts = await screen.findAllByText('Buddy');
    fireEvent.click(allBuddyTexts[0]);

    // Debug output immediately after clicking
    await waitFor(() => screen.debug());

    // Use regex and 'waitFor' to handle possible asynchronous updates and flexible text matching
    await waitFor(() => {
      const friendlyDogText = screen.getByText(/friendly dog/i);
      expect(friendlyDogText).toBeInTheDocument();
    });
    
  });
});
