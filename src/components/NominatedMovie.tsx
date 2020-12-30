import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { useSetRecoilState } from 'recoil';

import { hiddenListState, nominationListState } from '../recoil/atoms';
import { Movie } from '../utils/omdb';
import { DeleteButton } from './DeleteButton';
import { Poster } from './Poster';

import './NominatedMovie.css';

type Props = {
  movie?: Movie;
};

export function NominatedMovie(props: Props) {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const setNominationList = useSetRecoilState(nominationListState);
  const { movie } = props;
  const movieId = movie?.id;

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [movie]);

  function handleUnnominateMovie() {
    setHiddenList((hiddenList) => hiddenList.filter((id) => id !== movieId));
    setNominationList((nominationList) => nominationList.filter(({ id }) => id !== movieId));
  }

  return (
    <div className="nominated-movie" data-testid={movieId}>
      {movie ? (
        <Poster data-tip={`${movie.title} (${movie.year})`} movie={movie}>
          <DeleteButton movie={movie} onClick={handleUnnominateMovie} />
        </Poster>
      ) : (
        <Poster />
      )}
    </div>
  );
}
