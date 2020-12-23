import React, { useLayoutEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { movieListState } from '../recoil/atoms';
import { omdbSearchQuery } from '../recoil/selectors';
import { Movie } from './Movie';

import './MovieList.css';

export function MovieList() {
  const results = useRecoilValue(omdbSearchQuery(1));
  const [list, setList] = useRecoilState(movieListState);

  useLayoutEffect(() => {
    setList(results);
  }, [results, setList]);

  return (
    <div className="grid-container" role="list">
      {list.length ? (
        list.map((item) => {
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
