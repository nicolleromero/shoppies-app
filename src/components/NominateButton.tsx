import { useRecoilState, useSetRecoilState } from 'recoil';

import { MAX_NOMINATIONS } from '../constants';
import { hiddenListState, nominationListState } from '../recoil/atoms';
import { Movie } from '../utils/omdb';
import { Sparkles } from './Sparkles';

import './NominateButton.css';

type Props = {
  movie: Movie;
};

export function NominateButton(props: Props) {
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const setHiddenList = useSetRecoilState(hiddenListState);
  const movieId = props.movie.id;
  const nominated = nominationsList.some((obj) => obj.id === movieId);

  function handleNominate(event: React.MouseEvent<HTMLButtonElement>) {
    // Prevent opening movie details.
    event.preventDefault();

    setNominationsList((nominationsList) => [...nominationsList, props.movie]);
    setHiddenList((hiddenList) => [...hiddenList, movieId]);
  }

  if (!nominated && nominationsList.length === MAX_NOMINATIONS) {
    return null;
  }

  return (
    <Sparkles className="nominate-button">
      <button disabled={nominated} onClick={handleNominate}>
        {nominated ? 'Nominated' : 'Nominate!'}
      </button>
    </Sparkles>
  );
}
