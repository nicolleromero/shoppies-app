import React from 'react';
import { RecoilRoot } from 'recoil';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import App from '../App';

// testing for title
test('renders title', () => {
  render(<App />, { wrapper: RecoilRoot });
  const elements = screen.getAllByText(/the shoppies/i);
  expect(elements.length > 0).toBeTruthy();
});

// testing for footer on load
test('renders footer', () => {
  render(<App />, { wrapper: RecoilRoot });
  const elements = screen.getAllByText(/you'd like to nominate to/i);
  expect(elements.length > 0).toBeTruthy();
});

const sleep = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

// testing end-to-end search
test('submit search and return movie list', async () => {
  render(<App />, { wrapper: RecoilRoot });
  userEvent.type(screen.getByRole('textbox'), 'Star Wars');
  userEvent.click(screen.getByText(/send/i));
  await sleep(3000);
  const movieCards = screen.getAllByText(/star\s+wars/i);
  // console.warn(movieCards.map((el) => el.textContent));
  expect(movieCards.length).toEqual(10);
});

// testing nominate movie
test('submit movie nomination', async () => {
  render(<App />, { wrapper: RecoilRoot });
  userEvent.type(screen.getByRole('textbox'), '');
  userEvent.click(screen.getByText(/send/i));
  await sleep(3000);
  // const movieCards = screen.getAllByText(/star\s+wars/i);
  userEvent.hover(screen.getByTestId('Star Wars: Episode IV - A New Hope'));
  const nominateButtons = screen.getAllByText(/nominate!/i);
  userEvent.click(nominateButtons[0]);
  const nominatedMovie = screen.getAllByTestId(/tt+/i);
  expect(nominatedMovie.length).toBeGreaterThanOrEqual(1);
  // await act(() => sleep);
});
