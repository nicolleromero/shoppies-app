import React from 'react';

import { useSearchTerm } from '../utils/hooks';
import { MoviePage } from './MoviePage';

import './MovieList.css';

export function MovieList() {
  const query = useSearchTerm();

  return (
    <div className="grid-container" role="list">
      <MoviePage page={1} query={query} />;
    </div>
  );
}
