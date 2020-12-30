import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { useSetRecoilState } from 'recoil';

import { hiddenListState, nominationListState } from '../recoil/atoms';
import { Item } from '../utils/omdb';
import { DeleteButton } from './DeleteButton';
import { Poster } from './Poster';

import './NominatedMovie.css';

type Props = {
  item?: Item;
};

export function NominatedMovie(props: Props) {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const setNominationList = useSetRecoilState(nominationListState);
  const { item } = props;
  const itemId = item?.id;

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [item]);

  function handleUnnominateMovie() {
    setHiddenList((hiddenList) => hiddenList.filter((id) => id !== itemId));
    setNominationList((nominationList) => nominationList.filter(({ id }) => id !== itemId));
  }

  return (
    <div className="nominated-movie" data-testid={itemId}>
      {item ? (
        <Poster data-tip={`${item.title} (${item.year})`} item={item}>
          <DeleteButton item={item} onClick={handleUnnominateMovie} />
        </Poster>
      ) : (
        <Poster />
      )}
    </div>
  );
}
