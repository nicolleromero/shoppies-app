import { useRecoilState, RecoilState } from 'recoil';

import { Item } from '../utils/omdb';

import './DeleteButton.css';

type Props = {
  atom: RecoilState<Item[]>;
  item: Item;
};

export function DeleteButton(props: Props) {
  const [list, setList] = useRecoilState(props.atom);
  const itemId = props.item.id;

  function handleDeleteMovie() {
    const updatedList = list.filter((item) => item.id !== itemId);
    setList(updatedList);
  }

  return (
    <button className="delete-button" onClick={() => handleDeleteMovie()}>
      ✕
    </button>
  );
}
