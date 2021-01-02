import React, { useState } from 'react';

import { useSearchTerm } from '../utils/hooks';
import { MoviePage } from './MoviePage';

import './MovieList.css';

export function MovieList() {
  const query = useSearchTerm();

  // Use key to reset the number of pages state.
  // https://stackoverflow.com/a/21750576
  return <MovieListContent key={query} query={query} />;
}

function MovieListContent(props: { query: string }) {
  const [pages, setPages] = useState(1);
  const moviePages = [];

  function handleIntersect() {
    setPages(pages + 1);
  }

  for (let i = 1; i <= pages; i++) {
    moviePages.push(
      <MoviePage
        key={i}
        page={i}
        query={props.query}
        onIntersect={i === pages ? handleIntersect : undefined}
      />,
    );
  }

  return (
    <div className="grid-container" role="list">
      {moviePages}
    </div>
  );
}
