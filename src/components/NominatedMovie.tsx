import React from 'react';
import ReactTooltip from 'react-tooltip';

import { nominationListState } from '../recoil/atoms';
import { DeleteButton } from './DeleteButton';
import { Poster } from './Poster';

import { Item } from '../utils/omdb';

import './NominatedMovie.css';

type Props = {
  item: Item;
};

export function NominatedMovie(props: Props) {
  const itemId = props.item.id;

  return (
    <div className="card">
      <a data-tip data-for={itemId}>
        <Poster item={props.item}>
          <DeleteButton item={props.item} atom={nominationListState} />
        </Poster>
      </a>
      <ReactTooltip
        className="tooltip"
        id={itemId}
        place="top"
        type="dark"
        effect="solid"
        aria-haspopup="true"
      >
        {props.item.title} ({props.item.year})
      </ReactTooltip>
    </div>
  );
}
