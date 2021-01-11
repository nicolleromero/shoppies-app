import { useRecoilState, useSetRecoilState } from 'recoil';

import { MAX_NOMINATIONS } from '../constants';
import { hiddenListState, nominationListState } from '../recoil/atoms';
import { Movie } from '../utils/omdb';
import { Sparkles } from './Sparkles';

import './NominateButton.css';

type Props = {
  allowUnnominate?: boolean;
  movie: Movie;
};

export function NominateButton(props: Props) {
  const { allowUnnominate, movie } = props;
  const [nominationsList, setNominationsList] = useRecoilState(nominationListState);
  const setHiddenList = useSetRecoilState(hiddenListState);
  const movieId = movie.id;
  const nominated = nominationsList.some((obj) => obj.id === movieId);

  function handleNominate(event: React.MouseEvent<HTMLButtonElement>) {
    // Prevent opening movie details.
    event.preventDefault();

    if (!nominated) {
      setNominationsList((nominationsList) => [...nominationsList, props.movie]);
      setHiddenList((hiddenList) => [...hiddenList, movieId]);
    } else if (allowUnnominate) {
      setHiddenList((hiddenList) => hiddenList.filter((id) => id !== movieId));
      setNominationsList((nominationsList) => nominationsList.filter(({ id }) => id !== movieId));
    }
  }

  if (nominated && nominationsList.length === MAX_NOMINATIONS) {
    return null;
  }

  return (
    <Sparkles disabled={nominated} className="nominate-button">
      <button disabled={nominated && !allowUnnominate} onClick={handleNominate}>
        {!nominated ? 'Nominate!' : allowUnnominate ? 'Remove' : 'Nominated'}
      </button>
    </Sparkles>
  );
}
