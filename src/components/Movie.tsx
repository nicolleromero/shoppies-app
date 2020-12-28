import React from 'react';

import { movieListState } from '../recoil/atoms';
import { Item } from '../utils/omdb';
import { DeleteButton } from './DeleteButton';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';

import './Movie.css';

type Props = {
  item: Item;
};

export function Movie(props: Props) {
  return (
    <div className="movie" role="listitem" data-testid={props.item.title}>
      <Poster item={props.item}>
        <DeleteButton item={props.item} atom={movieListState} />
        <NominateButton item={props.item} />
      </Poster>
      <div className="movie-title">
        {props.item.title} ({props.item.year})
      </div>
    </div>
  );
}
