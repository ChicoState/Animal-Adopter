import { render, screen } from '@testing-library/react';
import HomePage from '../../App.js';

test('renders without crashing', () => {
  const animalTypes = [
    { option: 'Dogs', value: 'dog' },
    { option: 'Cats', value: 'cat' }
  ];
  render(<HomePage animalTypes={animalTypes} />);
  expect(screen.getByText(/Browse Animals/i)).toBeInTheDocument();
});
