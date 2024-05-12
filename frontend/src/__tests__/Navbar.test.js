import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '../components/NavbarComponent';
import UserProfile from '../pages/profilePage';
import { BrowserRouter as Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Navbar Component Tests', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    expect(screen.getByText('Animal Adopter')).toBeInTheDocument();
  });

  it('handles failure in fetching user image', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`http://127.0.0.1:8000/api/user/profile/default-username`).networkError();

    render(
      <Router>
        <Navbar />
      </Router>
    );

    await waitFor(() => expect(screen.queryByAltText('User Profile')).not.toBeInTheDocument());
    mock.restore();
  });

  it('displays loading indicator while fetching data', () => {
    render(<UserProfile username="testuser" />);
    expect(screen.getByText(/loading user data/i)).toBeInTheDocument();
  });

  it('navigates to the correct page when link is clicked', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  
    const adoptLink = screen.getByText('Adopt');
    fireEvent.click(adoptLink);
    expect(window.location.pathname).toBe('/adopt');
  });

});