import React from 'react';
import { useRecoilValue } from 'recoil';

import { MAX_NOMINATIONS } from '../constants';
import { nominationListState } from '../recoil/atoms';
import { NominatedMovie } from './NominatedMovie';
import { Sparkles } from './Sparkles';

import './NominationsList.css';

export function NominationsList() {
  const list = useRecoilValue(nominationListState);
  const placeholders = [];

  for (let i = 0; i < MAX_NOMINATIONS - list.length; i++) {
    placeholders.push(<NominatedMovie key={i} />);
  }

  if (list.length === 5) {
    return (
      <div className="nominations-footer">
        {list.map((movie) => {
          return (
            <Sparkles>
              <NominatedMovie movie={movie} key={movie.id} />
            </Sparkles>
          );
        })}
      </div>
    );
  }

  return (
    <div className="nominations-footer">
      {list.map((movie) => {
        return <NominatedMovie movie={movie} key={movie.id} />;
      })}
      {placeholders}
    </div>
  );
}
