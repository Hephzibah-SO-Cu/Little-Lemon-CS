import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingPage from 'components/BookingPage';
import userEvent from '@testing-library/user-event';

// Mock the Footer component to avoid rendering issues
jest.mock('components/Footer', () => () => <footer>Mocked Footer</footer>);

beforeEach(() => {
  // Mock fetchAPI for consistent test results
  window.fetchAPI = jest.fn().mockImplementation((date) => {
    const day = date.getDate();
    if (day % 2 === 0) {
      return ['17:00', '18:00', '19:00']; // Even days
    } else {
      return ['20:00', '21:00', '22:00']; // Odd days
    }
  });

  // Mock submitAPI
  window.submitAPI = jest.fn().mockResolvedValue(true);

  // Clear localStorage before each test
  localStorage.clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Renders the Main component', async () => {
  const mockFetchTimesForDate = jest.fn().mockResolvedValue(['20:00', '21:00', '22:00']);
  const mockSubmitForm = jest.fn();

  render(
    <MemoryRouter initialEntries={['/booking']}>
      <BookingPage
        availableTimes={['20:00', '21:00', '22:00']}
        dispatch={mockFetchTimesForDate}
        submitForm={mockSubmitForm}
        bookingData={[]}
      />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByRole('option', { name: /20:00/ })).toBeInTheDocument();
  });

  const headingElement = screen.getByText(/Reserve a Table/i);
  expect(headingElement).toBeInTheDocument();
});

test('Writes booking data to localStorage on form submission', async () => {
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  const mockFetchTimesForDate = jest.fn().mockResolvedValue(['17:00', '18:00', '19:00']);
  const mockSubmitForm = jest.fn().mockImplementation(async (formData) => {
    const newBooking = {
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests, 10),
      name: `${formData.firstName} ${formData.lastName}`,
    };
    const existingBookings = JSON.parse(localStorage.getItem('bookingData') || '[]');
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
  });

  render(
    <MemoryRouter initialEntries={['/booking']}>
      <BookingPage
        availableTimes={['17:00', '18:00', '19:00']}
        dispatch={mockFetchTimesForDate}
        submitForm={mockSubmitForm}
        bookingData={[]}
      />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByRole('option', { name: /17:00/ })).toBeInTheDocument();
  });

  const dateInput = screen.getByLabelText(/Date:/i);
  const timeSelect = screen.getByLabelText(/Time:/i);
  const guestsInput = screen.getByLabelText(/Number of Guests:/i);
  const firstNameInput = screen.getByLabelText(/First Name:/i);
  const lastNameInput = screen.getByLabelText(/Last Name:/i);
  const phoneInput = screen.getByLabelText(/Phone Number:/i);
  const emailInput = screen.getByLabelText(/Email:/i);
  const occasionSelect = screen.getByLabelText(/Select Occasion:/i);
  const submitButton = screen.getByText('Make Your Reservation');

  expect(submitButton).toBeDisabled();

  await userEvent.type(dateInput, '2025-03-20'); // Use a future date
  await userEvent.selectOptions(timeSelect, '17:00');
  await userEvent.clear(guestsInput);
  await userEvent.type(guestsInput, '2');
  await userEvent.type(firstNameInput, 'Busayo');
  await userEvent.type(lastNameInput, 'Adebayo');
  await userEvent.type(phoneInput, '+2348012345678');
  await userEvent.type(emailInput, 'busayo@example.com');
  await userEvent.selectOptions(occasionSelect, 'Birthday');

  await waitFor(() => {
    expect(submitButton).not.toBeDisabled();
  });

  await userEvent.click(submitButton);

  const expectedBooking = {
    date: '2025-03-20',
    time: '17:00',
    guests: 2,
    name: 'Busayo Adebayo',
  };
  expect(setItemSpy).toHaveBeenCalledWith(
    'bookingData',
    JSON.stringify([expectedBooking])
  );

  setItemSpy.mockRestore();
});

test('Reads booking data from localStorage on initialization', async () => {
  const mockBookings = [
    { date: '2025-03-18', time: '17:00', guests: 2, name: 'John Doe' },
    { date: '2025-03-19', time: '18:30', guests: 4, name: 'Jane Smith' },
  ];
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(mockBookings));

  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  const mockFetchTimesForDate = jest.fn().mockResolvedValue(['20:00', '21:00', '22:00']);
  const mockSubmitForm = jest.fn().mockImplementation(async (formData) => {
    const newBooking = {
      date: formData.date,
      time: formData.time,
      guests: parseInt(formData.guests, 10),
      name: `${formData.firstName} ${formData.lastName}`,
    };
    const existingBookings = JSON.parse(localStorage.getItem('bookingData') || '[]');
    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem('bookingData', JSON.stringify(updatedBookings));
  });

  render(
    <MemoryRouter initialEntries={['/booking']}>
      <BookingPage
        availableTimes={['20:00', '21:00', '22:00']}
        dispatch={mockFetchTimesForDate}
        submitForm={mockSubmitForm}
        bookingData={mockBookings}
      />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByRole('option', { name: /20:00/ })).toBeInTheDocument();
  });

  const dateInput = screen.getByLabelText(/Date:/i);
  const timeSelect = screen.getByLabelText(/Time:/i);
  const guestsInput = screen.getByLabelText(/Number of Guests:/i);
  const firstNameInput = screen.getByLabelText(/First Name:/i);
  const lastNameInput = screen.getByLabelText(/Last Name:/i);
  const phoneInput = screen.getByLabelText(/Phone Number:/i);
  const emailInput = screen.getByLabelText(/Email:/i);
  const occasionSelect = screen.getByLabelText(/Select Occasion:/i);
  const submitButton = screen.getByText('Make Your Reservation');

  expect(submitButton).toBeDisabled();

  await userEvent.type(dateInput, '2025-03-20');
  await userEvent.selectOptions(timeSelect, '20:00');
  await userEvent.clear(guestsInput);
  await userEvent.type(guestsInput, '3');
  await userEvent.type(firstNameInput, 'Busayo');
  await userEvent.type(lastNameInput, 'Adebayo');
  await userEvent.type(phoneInput, '+2348012345678');
  await userEvent.type(emailInput, 'busayo@example.com');
  await userEvent.selectOptions(occasionSelect, 'Anniversary');

  await waitFor(() => {
    expect(submitButton).not.toBeDisabled();
  });

  await userEvent.click(submitButton);

  const expectedBookings = [
    ...mockBookings,
    { date: '2025-03-20', time: '20:00', guests: 3, name: 'Busayo Adebayo' },
  ];
  expect(setItemSpy).toHaveBeenCalledWith(
    'bookingData',
    JSON.stringify(expectedBookings)
  );

  setItemSpy.mockRestore();
});