import { selectorFamily } from 'recoil';

import { getList } from '../utils/omdb';
import { searchState } from './atoms';

export const omdbSearchQuery = selectorFamily({
  key: 'omdbSearchQuery',
  get: (page: number) => ({ get }) => getList(get(searchState), page),
});
