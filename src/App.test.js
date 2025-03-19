import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetchAPI
const mockFetchAPI = jest.fn();
global.fetchAPI = mockFetchAPI;

describe('App', () => {
  beforeEach(() => {
    mockFetchAPI.mockReset();
    mockFetchAPI.mockResolvedValue(['17:00', '18:00', '19:00', '20:00', '21:00']);
  });

  test('renders Nav component with hamburger button', async () => {
    render(<App />);
    await waitFor(() => {
      const hamburgerElement = screen.getByText('☰');
      expect(hamburgerElement).toBeInTheDocument();
    });
  });
});