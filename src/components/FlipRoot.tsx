import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { useRecoilValue } from 'recoil';

import { hiddenListState } from '../recoil/atoms';
import { useSearchTerm } from '../utils/hooks';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function FlipRoot(props: Props) {
  const hiddenList = useRecoilValue(hiddenListState);
  const searchTerm = useSearchTerm();

  return (
    <Flipper
      className={props.className}
      flipKey={`${hiddenList.join()} ${searchTerm}`}
      spring="stiff"
    >
      {props.children}
    </Flipper>
  );
}
