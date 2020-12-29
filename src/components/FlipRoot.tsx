import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { useRecoilValue } from 'recoil';

import { hiddenListState } from '../recoil/atoms';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function FlipRoot(props: Props) {
  const hiddenList = useRecoilValue(hiddenListState);

  return (
    <Flipper className={props.className} flipKey={hiddenList.length} spring="stiff">
      {props.children}
    </Flipper>
  );
}
