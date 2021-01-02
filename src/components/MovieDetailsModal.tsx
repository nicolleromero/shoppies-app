import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import { omdbMovieDetails } from '../recoil/selectors';
import { nominationListState } from '../recoil/atoms';
// import { DismissButton } from './DismissButton';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';

import './MovieDetailsModal.css';

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
  const nominationsList = useRecoilValue(nominationListState);
  const nominated = nominationsList.some((obj) => obj.id === movieId);

  if (!movie) {
    return null;
  }

  function handleCloseModal() {
    // TODO: navigate to /?q=search
  }

  return (
    <div className="modal">
      {nominated && (
        <div className="ribbon ribbon-top-right">
          <span>NOMINATED</span>
        </div>
      )}
      {/* <DismissButton movie={movie} onClick={handleCloseModal} /> */}
      <Poster movie={movie}></Poster>
      <NominateButton movie={movie} />
      <div className="movie-details-title">
        <div>
          {movie.title} <span className="year">({movie.year})</span>
        </div>
        <div className="supporting-details">
          {movie.rated} | {movie.runtime} | {movie.genre} | {movie.released}
        </div>
        <div className="plot">
          Summary: {movie.plot}
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Writer:</strong> {movie.writer}
          </p>
          <p>
            <strong>Actors:</strong> {movie.actors}
          </p>
        </div>
      </div>
    </div>
  );
}

function MovieDetailsModalFallback() {
  return null;
}

// ratings: MovieRating[];
// metascore: string;
// imdbRating: string;
// imdbVotes: string;
