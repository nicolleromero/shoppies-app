import { Movie } from '../utils/omdb';

import './DeleteButton.css';

type Props = {
  movie: Movie;
  onClick: () => void;
};

export function DeleteButton(props: Props) {
  return (
    <button className="delete-button" onClick={props.onClick}>
      ✕
    </button>
  );
}
