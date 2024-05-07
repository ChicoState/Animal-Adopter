import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    // Mock the axios get call before each test
    axios.get.mockResolvedValue({
      data: { pet: [] },  // Mocked data
      status: 200         // Mocked status
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch pets and update state without errors', async () => {
    await waitFor(() => {  // Use waitFor to handle the asynchronous state update
      render(<App />);
    });

    expect(screen.getByText('Browse Animals')).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalled();
    // Check if Axios was called exactly once
    expect(axios.get).toHaveBeenCalledTimes(1);
    // Optionally, check the state or other effects
    expect(screen.queryByText('Dogs')).toBeInTheDocument(); // Example if you had specific outputs to check
    expect(screen.queryByText('Cats')).toBeInTheDocument();
  });
});
