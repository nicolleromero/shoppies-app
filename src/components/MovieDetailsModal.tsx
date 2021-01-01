import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import { omdbMovieDetails } from '../recoil/selectors';
// import { DismissButton } from './DismissButton';
import { Poster } from './Poster';

// import './MovieDetailsModal.css';

type Props = {
  match: any;
};

export function MovieDetailsModal(props: Props) {
  return (
    <Suspense fallback={<MovieDetailsModalFallback />}>
      <MovieDetailsModalContent {...props} />
    </Suspense>
  );
}

function MovieDetailsModalContent(props: Props) {
  const movieId = props.match.params.id;
  const movie = useRecoilValue(omdbMovieDetails(movieId));

  if (!movie) {
    return null;
  }

  function handleCloseModal() {
    <></>;
  }

  return (
    <div className="movie-details-modal">
      {/* <DismissButton movie={movie} onClick={handleCloseModal} /> */}
      <Poster movie={movie}></Poster>
      <div className="movie-details-title">
        {movie.title} ({movie.year})
      </div>
    </div>
  );
}

function MovieDetailsModalFallback() {
  return null;
}
