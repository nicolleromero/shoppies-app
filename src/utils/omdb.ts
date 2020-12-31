import { memoize } from './memoize';

const API_KEY = '7030d0e8';
const SEARCH_URL = 'https://www.omdbapi.com';

interface SearchData {
  Search: SearchMovie[];
}

interface SearchMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
}

export const getList = memoize(
  async (term: string, page: number = 1): Promise<Movie[]> => {
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
      return data.Search.map((movie) => {
        return {
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          image: movie.Poster,
        };
      });
    } else {
      return [];
    }
  },
);

// export const getMovieDetails = memoize(
//   async (title: string): Promise<Movie[]> => {
//     if (!title) {
//       return [];
//     }

//     const url = new URL(SEARCH_URL);
//     url.searchParams.append('apikey', API_KEY);
//     url.searchParams.append('t', title);
//     url.searchParams.append('type', 'movie');
//     url.searchParams.append('plot', 'full');

//     const response = await fetch(url.toString());

//     if (!response.ok) {
//       const message = `An error has occured: ${response.status}`;
//       console.error(message);
//       throw new Error(message);
//     }

//     const data: SearchMovieDetails = await response.json();
//   },
// );
