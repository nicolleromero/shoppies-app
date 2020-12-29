import { selectorFamily, waitForAll } from 'recoil';

import { getList } from '../utils/omdb';
import { hiddenListState, searchState } from './atoms';

export const omdbSearchQuery = selectorFamily({
  key: 'omdbSearchQuery',
  get: (page: number) => ({ get }) => getList(get(searchState), page),
});

export const filteredSearchQuery = selectorFamily({
  key: 'filteredSearchQuery',
  get: (page: number) => ({ get }) => {
    // waitForAll used to track multiple dependences in recoil
    const [list, hiddenList] = get(waitForAll([omdbSearchQuery(page), hiddenListState]));

    return list.filter((item) => !hiddenList.includes(item.id));
  },
});
