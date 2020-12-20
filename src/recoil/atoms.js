import { atom } from 'recoil';

const movieListState = atom({
  key: 'movieListState',
  default: [],
});

const nominationListState = atom({
  key: 'nominationListState',
  default: [],
});

const inputState = atom({
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

const searchState = atom({
  key: 'searchState',
  default: '',
});

const loadingState = atom({
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
