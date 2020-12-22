import React from 'react';

import { Item } from '../utils/omdb';

import './Poster.css';

type Props = {
  children?: React.ReactNode;
  item: Item;
};

export function Poster(props: Props) {
  return (
    <div>
      <div role="img" aria-label={props.item.title}>
        <img
          className="poster"
          alt=""
          src={props.item.image !== 'N/A' ? props.item.image : '/movie_poster.png'}
        />
      </div>
      {props.children}
    </div>
  );
}
