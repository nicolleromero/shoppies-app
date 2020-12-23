// import { atom } from 'recoil';

// import { currentUserIDState } from './atoms';

// type PersistenceOptions<T>: {
//   key: string,
//   restorer: (mixed, DefaultValue) => T | DefaultValue,
// };

// const localStorageEffect = <T>(options: PersistenceOptions<T>) => ({setSelf, onSet}) => {
//   const savedValue = localStorage.getItem(options.key)
//   if (savedValue != null) {
//     setSelf(options.restorer(JSON.parse(savedValue), new DefaultValue()));
//   }

//   onSet(newValue => {
//     if (newValue instanceof DefaultValue) {
//       localStorage.removeItem(options.key);
//     } else {
//       localStorage.setItem(options.key, JSON.stringify(newValue));
//     }
//   });
// };
