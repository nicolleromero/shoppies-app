import React from 'react';
import { useRecoilValue } from 'recoil';

import { filteredSearchQuery } from '../recoil/selectors';
import { MovieCard } from './MovieCard';

import './MovieList.css';

type Props = {
  query: string;
  page: number;
};

export function MoviePage(props: Props) {
  const results = useRecoilValue(filteredSearchQuery(props));

  if (!props.query && !results.length) {
    return null;
  }

  return (
    <>
      {results.length ? (
        results.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })
      ) : props.page === 1 ? (
        <p className="no-results-message">
          We weren't able to find any movies that match that title. Please modify your search and
          try again.
        </p>
      ) : null}
    </>
  );
}
