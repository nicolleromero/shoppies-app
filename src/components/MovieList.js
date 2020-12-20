import React from 'react';
import { useRecoilValue } from 'recoil';
import { movieListState } from '../recoil/atoms';

import { Movie } from './Movie';

export default function MovieList() {
  const list = useRecoilValue(movieListState);

  return (
    <div className="grid-container">
      {list.map((item) => {
        return <Movie item={item} key={item.id} />;
      })}
    </div>
  );
}
