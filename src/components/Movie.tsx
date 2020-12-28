import React from 'react';
import { useRecoilState } from 'recoil';

import { nominationListState } from '../recoil/atoms';
import { Item } from '../utils/omdb';
import { NominateButton } from './NominateButton';
import { MoviePosterSpring } from './MoviePosterSpring';

import './Movie.css';

type Props = {
  item: Item;
};

export function Movie(props: Props) {
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const itemId = props.item.id;
  const nominated =
    nominationsList.some((obj) => obj.id === itemId) || nominationsList.length === 5;

  function handleNominate() {
    const updatedNominationsList = [...nominationsList, props.item];
    setNominationsList(updatedNominationsList);
  }

  return (
    <div className="card" role="listitem" data-testid={props.item.title}>
      <MoviePosterSpring item={props.item}>
        <div className="hidden-button">
          <NominateButton text="✨Nominate!✨" disabled={nominated} onClick={handleNominate} />
        </div>
      </MoviePosterSpring>
      <div className="movie-title">
        {props.item.title} ({props.item.year})
      </div>
    </div>
  );
}
