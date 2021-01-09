import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { filteredSearchQuery } from '../recoil/selectors';
import { range } from '../utils/helpers';
import { ErrorBoundary } from './ErrorBoundary';
import { MovieCard } from './MovieCard';

import './MovieList.css';

type Props = {
  query: string;
  page: number;
  onIntersect?: () => void;
};

export function MoviePage(props: Props) {
  const { page } = props;

  return (
    <ErrorBoundary fallback={page === 1 ? <Redirect to="/" /> : null}>
      <Suspense fallback={<MoviePageFallback />}>
        <MoviePageContent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function MoviePageContent(props: Props) {
  const { query, page, onIntersect } = props;
  const results = useRecoilValue(filteredSearchQuery({ query, page }));

  if (!props.query && !results.length) {
    return null;
  }

  return (
    <>
      {results.length ? (
        results.map((movie, index) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            onIntersect={index === 0 ? onIntersect : undefined}
          />
        ))
      ) : props.page === 1 ? (
        <p className="no-results-message" role="listitem">
          We weren't able to find any movies that match that title. Please modify your search and
          try again.
        </p>
      ) : null}
    </>
  );
}

function MoviePageFallback() {
  return (
    <>
      {range(8).map((i) => (
        <MovieCard key={i} />
      ))}
    </>
  );
}
