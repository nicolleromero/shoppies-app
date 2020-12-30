import { selectorFamily, waitForAll } from 'recoil';

import { getList } from '../utils/omdb';
import { hiddenListState } from './atoms';

type SearchParams = {
  query: string;
  page: number;
};

export const omdbSearchQuery = selectorFamily({
  key: 'omdbSearchQuery',
  get: (params: SearchParams) => () => getList(params.query, params.page),
});

export const filteredSearchQuery = selectorFamily({
  key: 'filteredSearchQuery',
  get: (params: SearchParams) => ({ get }) => {
    // waitForAll used to track multiple dependences in recoil
    const [list, hiddenList] = get(waitForAll([omdbSearchQuery(params), hiddenListState]));

    return list.filter((movie) => !hiddenList.includes(movie.id));
  },
});
