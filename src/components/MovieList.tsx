import React from 'react';
import { useRecoilValue } from 'recoil';

import { searchState } from '../recoil/atoms';
import { filteredSearchQuery } from '../recoil/selectors';
import { Movie } from './Movie';

import './MovieList.css';

export function MovieList() {
  const results = useRecoilValue(filteredSearchQuery(1));
  const searchTerm = useRecoilValue(searchState);

  if (!searchTerm && !results.length) {
    return null;
  }

  return (
    <div className="grid-container" role="list">
      {results.length ? (
        results.map((item) => {
          return <Movie item={item} key={item.id} />;
        })
      ) : (
        <p className="no-results-message">
          We weren't able to find any movies that match that title. Please modify your search and
          try again.
        </p>
      )}
    </div>
  );
}
