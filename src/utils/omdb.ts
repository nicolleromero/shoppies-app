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

interface SearchMovieDetails extends SearchMovie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: SearchMovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

interface SearchMovieRating {
  Source: string;
  Value: string;
}

export interface Movie {
  id: string;
  title: string;
  year: string;
  image: string;
}

export interface MovieDetails extends Movie {
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  rottenTomatoes?: number;
  metascore?: number;
  imdbRating?: number;
  imdbVotes: string;
  type: string;
  dvd: string;
  boxoffice: string;
  production: string;
  website: string;
}

async function omdbAPICall(params: Record<string, string>) {
  const url = new URL(SEARCH_URL);
  url.searchParams.append('apikey', API_KEY);
  url.searchParams.append('type', 'movie');

  for (const param in params) {
    url.searchParams.append(param, params[param]);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.error(message);
    throw new Error(message);
  }

  const data = await response.json();

  if (data.Error) {
    console.error(data.Error);
    throw new Error(data.Error);
  }

  return data;
}

export const getSearchResults = memoize(
  async (term: string, page: number = 1): Promise<Movie[]> => {
    if (!term) {
      return [];
    }

    const params = { s: term, page: String(page) };
    const data: SearchData = await omdbAPICall(params);

    if (!data.Search) {
      return [];
    }

    return data.Search.map((movie) => {
      return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
      };
    });
  },
);

export const getMovieDetails = memoize(
  async (id: string): Promise<MovieDetails | null> => {
    if (!id) {
      return null;
    }

    const params = { i: id, plot: 'full' };
    const data: SearchMovieDetails = await omdbAPICall(params);

    if (!data) {
      return null;
    }

    // Rotten Tomatoes rating does not have its own property
    const rottenTomatoRating = data.Ratings.find((rating) => rating.Source === 'Rotten Tomatoes');

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      rated: data.Rated,
      released: data.Released,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      writer: data.Writer,
      actors: data.Actors,
      plot: data.Plot,
      language: data.Language,
      country: data.Country,
      awards: data.Awards,
      image: data.Poster,
      rottenTomatoes: rottenTomatoRating && parseInt(rottenTomatoRating.Value),
      metascore: data.Metascore !== 'N/A' ? Number(data.Metascore) : undefined,
      imdbRating: data.imdbRating !== 'N/A' ? Number(data.imdbRating) : undefined,
      imdbVotes: data.imdbVotes,
      type: data.Type,
      dvd: data.DVD,
      boxoffice: data.BoxOffice,
      production: data.Production,
      website: data.Website,
    };
  },
);
