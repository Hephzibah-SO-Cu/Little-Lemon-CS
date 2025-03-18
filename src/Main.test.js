import { initializeTimes, updateTimes } from 'components/Main';

test('initializeTimes returns the correct initial times', () => {
  const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const result = initializeTimes();
  expect(result).toEqual(expectedTimes);
});

test('updateTimes returns the same state for UPDATE_TIMES action', () => {
  const state = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const action = { type: 'UPDATE_TIMES', date: '2025-03-17' };
  const result = updateTimes(state, action);
  expect(result).toEqual(state);
});