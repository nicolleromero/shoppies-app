import { useRecoilState, useSetRecoilState } from 'recoil';

import { MAX_NOMINATIONS } from '../constants';
import { hiddenListState, nominationListState } from '../recoil/atoms';
import { Item } from '../utils/omdb';

import './NominateButton.css';

type Props = {
  item: Item;
};

export function NominateButton(props: Props) {
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const setHiddenList = useSetRecoilState(hiddenListState);
  const itemId = props.item.id;
  const nominated = nominationsList.some((obj) => obj.id === itemId);

  function handleNominate() {
    setNominationsList((nominationsList) => [...nominationsList, props.item]);
    setHiddenList((hiddenList) => [...hiddenList, itemId]);
  }

  if (!nominated && nominationsList.length === MAX_NOMINATIONS) {
    return null;
  }

  return (
    <button className="nominate-button" disabled={nominated} onClick={handleNominate}>
      {nominated ? '✨Nominated✨' : '✨Nominate!✨'}
    </button>
  );
}
