import React from 'react';
import { useRecoilState } from 'recoil';

import { nominationListState } from '../recoil/atoms';
import { Button } from './Button';

export default function Item(props) {
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const itemId = props.item.id;

  function handleRemoveNomination() {
    const updatedList = nominationsList.filter((item) => item.id !== itemId);
    setNominationsList(updatedList);
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
          <Button text="Remove Nomination" onClick={handleRemoveNomination} />
        </div>
      </div>
    </div>
  );
}
