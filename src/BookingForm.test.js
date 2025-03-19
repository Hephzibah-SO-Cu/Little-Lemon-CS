import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from 'components/BookingForm';
import userEvent from '@testing-library/user-event';

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
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Renders the BookingForm submit button text', () => {
  const mockFormData = {
    date: '',
    time: '',
    guests: 1,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    occasion: '',
  };
  const mockAvailableTimes = window.fetchAPI(new Date('2025-03-18')); // Even day
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();

  render(
    <MemoryRouter>
      <BookingForm
        formData={mockFormData}
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    </MemoryRouter>
  );

  const buttonElement = screen.getByText('Make Your Reservation');
  expect(buttonElement).toBeInTheDocument();
});

test('Renders the BookingForm "Date:" label', () => {
  const mockFormData = {
    date: '',
    time: '',
    guests: 1,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    occasion: '',
  };
  const mockAvailableTimes = window.fetchAPI(new Date('2025-03-18')); // Even day
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();

  render(
    <MemoryRouter>
      <BookingForm
        formData={mockFormData}
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    </MemoryRouter>
  );

  const labelElement = screen.getByText('Date:');
  expect(labelElement).toBeInTheDocument();
});

test('Allows the user to submit the BookingForm', async () => {
  const mockFormData = {
    date: '2025-03-18',
    time: '17:00',
    guests: 1,
    firstName: 'Busayo',
    lastName: 'Adebayo',
    phone: '+2348012345678',
    email: 'busayo@example.com',
    occasion: 'Birthday',
  };
  const mockAvailableTimes = window.fetchAPI(new Date('2025-03-18')); // Even day
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();

  render(
    <MemoryRouter>
      <BookingForm
        formData={mockFormData}
        availableTimes={mockAvailableTimes}
        dispatch={mockDispatch}
        submitForm={mockSubmitForm}
      />
    </MemoryRouter>
  );

  const submitButton = screen.getByText('Make Your Reservation');
  await userEvent.click(submitButton);

  expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  expect(mockSubmitForm).toHaveBeenCalledWith(mockFormData);
});