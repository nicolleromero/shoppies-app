import React from 'react';
import { useSetRecoilState } from 'recoil';

import { Item } from '../utils/omdb';
import { DeleteButton } from './DeleteButton';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';

import { hiddenListState } from '../recoil/atoms';

import './Movie.css';

type Props = {
  item: Item;
};

export function Movie(props: Props) {
  const setHiddenList = useSetRecoilState(hiddenListState);
  let itemId = props.item.id;

  function handleHideMovie() {
    setHiddenList((hiddenList) => [...hiddenList, itemId]);
  }

  return (
    <div className="movie" role="listitem" data-testid={props.item.title}>
      <Poster item={props.item}>
        <DeleteButton item={props.item} onClick={handleHideMovie} />
        <NominateButton item={props.item} />
      </Poster>
      <div className="movie-title">
        {props.item.title} ({props.item.year})
      </div>
    </div>
  );
}
