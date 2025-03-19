import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from 'components/Main';
import { updateTimes } from 'components/Main';

// Mock fetchAPI
const mockFetchAPI = jest.fn();
global.fetchAPI = mockFetchAPI;

describe('Main Component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockFetchAPI.mockReset();
  });

  test('initializeTimes fetches and dispatches available times', async () => {
    // Mock fetchAPI to return a non-empty array of times
    const mockTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];
    mockFetchAPI.mockResolvedValue(mockTimes);

    // Render Main inside MemoryRouter
    render(
      <MemoryRouter initialEntries={['/']}>
        <Main />
      </MemoryRouter>
    );

    // Wait for the async fetchAPI call to resolve
    await waitFor(() => {
      expect(mockFetchAPI).toHaveBeenCalledWith(expect.any(Date));
    });
  });
});

describe('updateTimes Reducer', () => {
  test('updateTimes updates state with new times when UPDATE_TIMES action is dispatched', () => {
    const initialState = [];
    const newTimes = ['17:00', '18:00', '19:00'];
    const action = { type: 'UPDATE_TIMES', times: newTimes };
    const result = updateTimes(initialState, action);
    expect(result).toEqual(newTimes);
  });

  test('updateTimes returns current state when action.times is empty', () => {
    const initialState = ['17:00', '18:00', '19:00'];
    const action = { type: 'UPDATE_TIMES', times: null };
    const result = updateTimes(initialState, action);
    expect(result).toEqual(initialState);
  });

  test('updateTimes returns current state for unknown action type', () => {
    const initialState = ['17:00', '18:00', '19:00'];
    const action = { type: 'UNKNOWN_ACTION' };
    const result = updateTimes(initialState, action);
    expect(result).toEqual(initialState);
  });
});