import React from 'react';
import { useRecoilState } from 'recoil';
import ReactTooltip from 'react-tooltip';

import { nominationListState } from '../recoil/atoms';
import { NominateButton } from './NominateButton';
import { DeleteButton } from './DeleteButton';
import { Poster } from './Poster';

import { Item } from '../utils/omdb';

import './NominatedMovie.css';

type Props = {
  item: Item;
};

export function NominatedMovie(props: Props) {
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const itemId = props.item.id;

  function handleRemoveNomination() {
    const updatedList = nominationsList.filter((item) => item.id !== itemId);
    setNominationsList(updatedList);
  }

  return (
    <div className="card">
      <div>
        <DeleteButton item={props.item} atom={nominationListState} />
        <a data-tip data-for={itemId}>
          <Poster item={props.item} />
        </a>
        <ReactTooltip id={itemId} aria-haspopup="true">
          {props.item.title} ({props.item.year})
        </ReactTooltip>
        {/* <NominateButton text="Remove Nomination" onClick={handleRemoveNomination} /> */}
      </div>
    </div>
  );
}
