import '@testing-library/jest-dom/extend-expect';

import { getList } from '../omdb';

test('returns search results', async () => {
  const data = await getList('star wars', 1);
  expect(data.length).toEqual(10);
});
