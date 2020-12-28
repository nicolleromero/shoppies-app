import React from 'react';
import { useRecoilState } from 'recoil';

import { movieListState, nominationListState } from '../recoil/atoms';
import { Item } from '../utils/omdb';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';

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

    handleDeleteMovie();
  }

  function handleDeleteMovie() {
    const updatedList = movieList.filter((item) => item.id !== itemId);
    setMovieList(updatedList);
  }

  return (
    <div className="card" role="listitem" data-testid={props.item.title}>
      <Poster item={props.item}>
        <div className="hidden-button">
          <NominateButton
            text={nominated ? '✨Nominated✨' : '✨Nominate!✨'}
            disabled={nominated}
            onClick={handleNominate}
          />
        </div>
      </Poster>
      <div className="movie-title">
        {props.item.title} ({props.item.year})
      </div>
    </div>
  );
}
