import { Movie } from '../utils/omdb';

import './DeleteButton.css';

type Props = {
  movie: Movie;
  onClick: () => void;
};

export function DeleteButton(props: Props) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    // Prevent showing movie details.
    event.preventDefault();

    props.onClick();
  }

  return (
    <button className="delete-button" onClick={handleClick}>
      ✕
    </button>
  );
}
