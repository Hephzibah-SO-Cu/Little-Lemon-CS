import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Nav component with hamburger button', () => {
  render(<App />);
  const hamburgerElement = screen.getByText('☰');
  expect(hamburgerElement).toBeInTheDocument();
});