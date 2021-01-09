import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

// This will mock the IntersectionObserver API.
import 'react-intersection-observer/test-utils';

import App from '../App';

// Using any because of typing bug in Jest.
function Wrapper(props: any) {
  return (
    <Router>
      <RecoilRoot>{props.children}</RecoilRoot>
    </Router>
  );
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// testing for title
test('renders title', () => {
  render(<App />, { wrapper: Wrapper });
  const elements = screen.getAllByText(/the shoppies/i);
  expect(elements.length > 0).toBeTruthy();
});

// testing for footer on load
test('renders footer', () => {
  render(<App />, { wrapper: Wrapper });
  const elements = screen.getAllByText(/you'd like to nominate to/i);
  expect(elements.length > 0).toBeTruthy();
});

// testing end-to-end search
test('submit search and return movie list', async () => {
  render(<App />, { wrapper: Wrapper });
  userEvent.type(screen.getByRole('textbox'), 'Star Wars');
  userEvent.click(screen.getByText(/search/i));
  await sleep(3000);
  const movieCards = screen.getAllByText(/star wars/i);
  console.warn(movieCards.map((el) => el.textContent));
  expect(movieCards.length).toBeGreaterThanOrEqual(10);
});
