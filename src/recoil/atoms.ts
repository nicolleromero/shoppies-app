import { atom } from 'recoil';

import { Movie } from '../utils/omdb';
import { localStorageEffect } from './effects';

export const hiddenListState = atom<string[]>({
  key: 'hiddenListState',
  default: [],
});

export const nominationListState = atom<Movie[]>({
  key: 'nominationListState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('nominationListState')],
});

export const nominationState = atom<boolean>({
  key: 'nominationState',
  default: false,
});
