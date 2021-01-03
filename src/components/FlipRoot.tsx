import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { hiddenListState } from '../recoil/atoms';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function FlipRoot(props: Props) {
  const hiddenList = useRecoilValue(hiddenListState);
  const location = useLocation();

  return (
    <Flipper
      className={props.className}
      flipKey={`${hiddenList.join()} ${location.pathname}${location.search}`}
      spring="stiff"
    >
      {props.children}
    </Flipper>
  );
}
