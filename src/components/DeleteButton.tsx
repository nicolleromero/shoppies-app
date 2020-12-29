import { Item } from '../utils/omdb';

import './DeleteButton.css';

type Props = {
  item: Item;
  onClick: () => void;
};

export function DeleteButton(props: Props) {
  return (
    <button className="delete-button" onClick={props.onClick}>
      ✕
    </button>
  );
}
