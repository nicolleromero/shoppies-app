import React from 'react';
import { useRecoilValue } from 'recoil';
import { nominationListState } from '../recoil/atoms';
import { MAX_NOMINATIONS } from '../constants';
import NominatedMovie from './NominatedMovie';

export default function NominationsList() {
  const list = useRecoilValue(nominationListState);
  const placeholders = [];

  for (let i = 0; i < MAX_NOMINATIONS - list.length; i++) {
    placeholders.push(<div className="card" key={i} />);
  }

  return (
    <div className="nominations-footer">
      {list.map((item) => {
        return <NominatedMovie item={item} key={item.id} />;
      })}
      {placeholders}
    </div>
  );
}
