import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import YourFormComponent from '../components/FormComponent';

jest.mock('axios');

describe('YourFormComponent', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'testUser');
    axios.post.mockResolvedValue({ data: { id: '123' } }); // Mocking axios response
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders with initial empty state', () => {
    render(<YourFormComponent />);
    expect(screen.getByLabelText('Name:')).toHaveValue('');
    expect(screen.getByLabelText('Animals birthday:')).toHaveValue('');
    expect(screen.getByLabelText('Price:')).toHaveValue('');
    expect(screen.getByLabelText('About:')).toHaveValue('');
    expect(screen.getByLabelText('Location:')).toHaveValue('');
    expect(screen.getByLabelText('Contact:')).toHaveValue('');
    expect(screen.getAllByRole('radio').length).toBe(3);
    expect(localStorage.getItem('username')).toBe('testUser');
  });

  it('updates text inputs correctly', () => {
    render(<YourFormComponent />);
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    expect(nameInput.value).toBe('Test Name');
  });
  
  it('handles checkbox changes', () => {
    render(<YourFormComponent />);
    const checkbox = screen.getByLabelText("Doesn't like kids.");
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
  
  it('submits form data correctly', async () => {
    render(<YourFormComponent />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Animal information saved successfully!')).toBeInTheDocument();
    });
  });

  test('adds and removes image inputs', () => {
    const { container } = render(<YourFormComponent />);
    // console.log(container.innerHTML); // Log the HTML to see if "+" is rendered
    const addButton = screen.getByText('+');
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByRole('textbox').length).toBe(5); // Assuming textboxes for images, adjust if using different input type
  });
  
  
});
