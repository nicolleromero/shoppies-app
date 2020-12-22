import React from 'react';
import { useRecoilState } from 'recoil';

import { movieListState, nominationListState } from '../recoil/atoms';
import { Item } from '../utils/omdb';
import { NominateButton } from './NominateButton';
import { DeleteButton } from './DeleteButton';
import { Poster } from './Poster';
import { MoviePosterSpring } from './MoviePosterSpring';

import './Movie.css';

type Props = {
  item: Item;
};

export function Movie(props: Props) {
  const [movieList, setMovieList] = useRecoilState(movieListState);
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const itemId = props.item.id;
  const nominated =
    nominationsList.some((obj) => obj.id === itemId) || nominationsList.length === 5;

  function handleNominate() {
    const updatedNominationsList = [...nominationsList, props.item];
    setNominationsList(updatedNominationsList);
  }

  return (
    <div className="card">
      <DeleteButton item={props.item} atom={movieListState} />
      {/* <Poster item={props.item} /> */}
      <MoviePosterSpring item={props.item} />
      <div className="movie-title">
        {props.item.title} ({props.item.year})
      </div>
      <div className="hidden-button">
        <NominateButton text="✨Nominate!✨" disabled={nominated} onClick={handleNominate} />
      </div>
    </div>
  );
}
