import '@testing-library/jest-dom/extend-expect';

import { getSearchResults } from '../omdb';

test('returns search results', async () => {
  const data = await getSearchResults('star wars', 1);
  expect(data.length).toEqual(10);
});
