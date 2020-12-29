import React from 'react';
import { useSetRecoilState } from 'recoil';
import ReactTooltip from 'react-tooltip';

import { hiddenListState, nominationListState } from '../recoil/atoms';
import { DeleteButton } from './DeleteButton';
import { Poster } from './Poster';

import { Item } from '../utils/omdb';

import './NominatedMovie.css';

type Props = {
  item: Item;
};

export function NominatedMovie(props: Props) {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const setNominationList = useSetRecoilState(nominationListState);
  const itemId = props.item.id;

  function handleUnnominateMovie() {
    setHiddenList((hiddenList) => hiddenList.filter((id) => id !== itemId));
    setNominationList((nominationList) => nominationList.filter((item) => item.id !== itemId));
  }

  return (
    <div className="nominated-movie" data-testid={itemId}>
      <Poster data-tip data-for={itemId} item={props.item}>
        <DeleteButton item={props.item} onClick={handleUnnominateMovie} />
      </Poster>
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
