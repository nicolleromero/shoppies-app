import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { useRecoilValue } from 'recoil';

import { hiddenListState } from '../recoil/atoms';
import { useSearchTerm, useSelectedMovieId } from '../utils/hooks';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function FlipRoot(props: Props) {
  const hiddenList = useRecoilValue(hiddenListState);
  const searchTerm = useSearchTerm();
  const selectedMovieId = useSelectedMovieId();
  const flipKey = [...hiddenList, searchTerm, selectedMovieId].join();

  return (
    <Flipper className={props.className} flipKey={flipKey} portalKey="root" spring="stiff">
      {props.children}
    </Flipper>
  );
}
