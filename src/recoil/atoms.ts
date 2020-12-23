import { atom } from 'recoil';

import { Item } from '../utils/omdb';

// type PersistenceOptions<T>: {
//   key: string,
//   restorer: (mixed, DefaultValue) => T | DefaultValue,
// };

// const currentUserIDState = atom<number>({
//   key: 'CurrentUserID',
//   default: 1,
//   effects_UNSTABLE: [
//     localStorageEffect({
//       key: 'current_user',
//       restorer: (value, defaultValue) =>
//         // values are currently persisted as numbers
//         typeof value === 'number'
//           ? value
//           : // if value was previously persisted as a string, parse it to a number
//           typeof value === 'string'
//           ? parseInt(value, 10)
//           : // if type of value is not recognized, then use the atom's default value.
//             defaultValue,
//     }),
//   ],
// });

const inputState = atom<string>({
  key: 'inputState',
  default: '',
});

const movieListState = atom<Item[]>({
  key: 'movieListState',
  default: [],
});

const nominationListState = atom<Item[]>({
  key: 'nominationListState',
  default: [],
});

const searchState = atom<string>({
  key: 'searchState',
  default: '',
});

const selectedState = atom({
  key: 'selectedState',
  default: [],
});

export {
  // currentUserIDState,
  inputState,
  movieListState,
  nominationListState,
  searchState,
  selectedState,
};
