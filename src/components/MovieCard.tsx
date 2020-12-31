import React from 'react';
import { useSetRecoilState } from 'recoil';
import ContentLoader from 'react-content-loader';

import { Movie } from '../utils/omdb';
import { DeleteButton } from './DeleteButton';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';

import { hiddenListState } from '../recoil/atoms';

import './MovieCard.css';

type Props = {
  movie?: Movie;
};

export function MovieCard(props: Props) {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const { movie } = props;

  if (!movie) {
    return (
      <div className="movie" role="listitem">
        <Poster />
        <div className="movie-title">
          <TitleGlimmer />
        </div>
      </div>
    );
  }

  let movieId = movie.id;

  function handleHideMovie() {
    setHiddenList((hiddenList) => [...hiddenList, movieId]);
  }

  return (
    <div className="movie" role="listitem" data-testid={movie.title}>
      <Poster movie={movie}>
        <DeleteButton movie={movie} onClick={handleHideMovie} />
        <NominateButton movie={movie} />
      </Poster>
      <div className="movie-title">
        {movie.title} ({movie.year})
      </div>
    </div>
  );
}

function TitleGlimmer() {
  return (
    <ContentLoader width="100%" height="36">
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="14" />
      <rect x="0" y="20" rx="2" ry="2" width="100%" height="14" />
    </ContentLoader>
  );
}
