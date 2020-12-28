import { useRecoilState } from 'recoil';

import { MAX_NOMINATIONS } from '../constants';
import { nominationListState } from '../recoil/atoms';
import { Item } from '../utils/omdb';

import './NominateButton.css';

type Props = {
  item: Item;
};

export function NominateButton(props: Props) {
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const itemId = props.item.id;
  const nominated = nominationsList.some((obj) => obj.id === itemId);

  function handleNominate() {
    const updatedNominationsList = [...nominationsList, props.item];
    setNominationsList(updatedNominationsList);
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
