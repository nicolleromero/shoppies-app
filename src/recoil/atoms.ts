import { atom } from 'recoil';

import { Item } from '../utils/omdb';

const movieListState = atom<Item[]>({
  key: 'movieListState',
  default: [],
});

const nominationListState = atom<Item[]>({
  key: 'nominationListState',
  default: [],
});

const inputState = atom<string>({
  key: 'inputState',
  default: '',
});

const selectedState = atom({
  key: 'selectedState',
  default: [],
});

const optionsState = atom({
  key: 'optionsState',
  default: [],
});

const searchState = atom<string>({
  key: 'searchState',
  default: '',
});

const loadingState = atom<boolean>({
  key: 'loadingState',
  default: true,
});

export {
  movieListState,
  nominationListState,
  inputState,
  selectedState,
  optionsState,
  searchState,
  loadingState,
};
