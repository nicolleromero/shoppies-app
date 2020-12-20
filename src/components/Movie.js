import React from 'react';
import { useRecoilState } from 'recoil';

import { movieListState, nominationListState } from '../recoil/atoms';
import { Button } from './Button';

export function Movie(props) {
  const [list, setList] = useRecoilState(movieListState);
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const itemId = props.item.id;
  const nominated = nominationsList.some((obj) => obj.id === itemId);

  function handleNominate() {
    const updatedNominationsList = [...nominationsList, props.item];
    setNominationsList(updatedNominationsList);
  }

  return (
    <div className="card">
      <div>
        <div role="img" aria-label={props.item.title}>
          <img
            className="image"
            alt=""
            src={props.item.image !== 'N/A' ? props.item.image : '/movie_poster.png'}
          />
          <div>
            Title: {props.item.title} (Year: {props.item.year})
          </div>
          <Button text="Nominate!" disabled={nominated} onClick={handleNominate} />
        </div>
      </div>
    </div>
  );
}
