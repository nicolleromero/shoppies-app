import React from 'react';
import { useSetRecoilState } from 'recoil';

import { Movie } from '../utils/omdb';
import { DeleteButton } from './DeleteButton';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';

import { hiddenListState } from '../recoil/atoms';

import './MovieCard.css';

type Props = {
  movie: Movie;
};

export function MovieCard(props: Props) {
  const setHiddenList = useSetRecoilState(hiddenListState);
  let movieId = props.movie.id;

  function handleHideMovie() {
    setHiddenList((hiddenList) => [...hiddenList, movieId]);
  }

  return (
    <div className="movie" role="listitem" data-testid={props.movie.title}>
      <Poster movie={props.movie}>
        <DeleteButton movie={props.movie} onClick={handleHideMovie} />
        <NominateButton movie={props.movie} />
      </Poster>
      <div className="movie-title">
        {props.movie.title} ({props.movie.year})
      </div>
    </div>
  );
}
