import { memoize } from './memoize';

const API_KEY = '7030d0e8';
const SEARCH_URL = 'https://www.omdbapi.com';

interface SearchData {
  Search: SearchItem[];
}

interface SearchItem {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface Item {
  id: string;
  title: string;
  year: string;
  image: string;
}

export const getList = memoize(
  async (term: string, page: number = 1): Promise<Item[]> => {
    if (!term) {
      return [];
    }

    const url = new URL(SEARCH_URL);
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('s', term);
    url.searchParams.append('type', 'movie');
    url.searchParams.append('page', String(page));

    const response = await fetch(url.toString());

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.error(message);
      throw new Error(message);
    }

    const data: SearchData = await response.json();

    if (data.Search) {
      return data.Search.map((item) => {
        return {
          id: item.imdbID,
          title: item.Title,
          year: item.Year,
          image: item.Poster,
        };
      });
    } else {
      return [];
    }
  },
);

// export const getMovieDetails = memoize(
//   async (term: string): Promise<Item[]> => {
//     const url = new URL(SEARCH_URL);
//     url.searchParams.append('apikey', API_KEY);
//     url.searchParams.append('i', term);
//     url.searchParams.append('type', 'movie');
//     url.searchParams.append('plot', 'full');

//     const response = await fetch(url.toString());

//     if (!response.ok) {
//       const message = `An error has occured: ${response.status}`;
//       console.error(message);
//       throw new Error(message);
//     }

//     const data: SearchData = await response.json();

//     return data.Search.map((item) => {
//       return {
//         ...item,
//         {
//           Rated,
//           Released,
//           Runtime,
//           Genre,

//         }
//       };
//     });
//   },
// );
