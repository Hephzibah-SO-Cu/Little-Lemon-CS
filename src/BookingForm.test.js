import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from 'components/BookingForm';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  jest.spyOn(window.HTMLFormElement.prototype, 'submit').mockImplementation(() => {});
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
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  render(
    <MemoryRouter>
      <BookingForm
        formData={mockFormData}
        availableTimes={mockAvailableTimes}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
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
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  render(
    <MemoryRouter>
      <BookingForm
        formData={mockFormData}
        availableTimes={mockAvailableTimes}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
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
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  render(
    <MemoryRouter>
      <BookingForm
        formData={mockFormData}
        availableTimes={mockAvailableTimes}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
      />
    </MemoryRouter>
  );

  const submitButton = screen.getByText('Make Your Reservation');
  await userEvent.click(submitButton);

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
});