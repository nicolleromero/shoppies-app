import { atom } from 'recoil';

import { Movie } from '../utils/omdb';
import { localStorageEffect } from './effects';

export const inputState = atom<string>({
  key: 'inputState',
  default: '',
});

export const hiddenListState = atom<string[]>({
  key: 'hiddenListState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('hiddenListState')],
});

export const nominationListState = atom<Movie[]>({
  key: 'nominationListState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('nominationListState')],
});

export const selectedState = atom({
  key: 'selectedState',
  default: [],
});
