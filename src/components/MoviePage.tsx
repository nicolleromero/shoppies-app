import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import { filteredSearchQuery } from '../recoil/selectors';
import { MovieCard } from './MovieCard';

import './MovieList.css';

type Props = {
  query: string;
  page: number;
  onIntersect?: () => void;
};

export function MoviePage(props: Props) {
  return (
    <Suspense fallback={<MoviePageFallback />}>
      <MoviePageContent {...props} />
    </Suspense>
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
  const cards = [];

  for (let i = 0; i < 8; i++) {
    cards.push(<MovieCard key={i} />);
  }

  return <>{cards}</>;
}
