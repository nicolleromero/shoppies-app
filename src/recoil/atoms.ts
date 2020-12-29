import { atom } from 'recoil';

import { Item } from '../utils/omdb';
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

export const nominationListState = atom<Item[]>({
  key: 'nominationListState',
  default: [],
  effects_UNSTABLE: [localStorageEffect('nominationListState')],
});

export const searchState = atom<string>({
  key: 'searchState',
  default: '',
  effects_UNSTABLE: [localStorageEffect('searchState')],
});

export const selectedState = atom({
  key: 'selectedState',
  default: [],
});
