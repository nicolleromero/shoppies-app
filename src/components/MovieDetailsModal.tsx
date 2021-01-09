import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { omdbMovieDetails } from '../recoil/selectors';
import { nominationListState } from '../recoil/atoms';
import { DismissButton } from './DismissButton';
import { ErrorBoundary } from './ErrorBoundary';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';
import { Ratings } from './Ratings';

import './MovieDetailsModal.css';

type Props = {
  match: any;
};

export function MovieDetailsModal(props: Props) {
  return (
    <ErrorBoundary fallback={<Redirect to="/" />}>
      <Suspense fallback={<MovieDetailsModalFallback />}>
        <MovieDetailsModalContent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

function MovieDetailsModalContent(props: Props) {
  const movieId = props.match.params.id;
  const movie = useRecoilValue(omdbMovieDetails(movieId));
  const nominationsList = useRecoilValue(nominationListState);
  const nominated = nominationsList.some((obj) => obj.id === movieId);

  if (!movie) {
    // Redirect to homepage if movie details not found
    return <Redirect to="/" />;
  }

  return (
    <div className="modal">
      {nominated && (
        <div className="ribbon ribbon-top-right">
          <span>NOMINATED</span>
        </div>
      )}
      <div className="column">
        <DismissButton />
        <Poster clickable={false} movie={movie}></Poster>
        <NominateButton movie={movie} />
      </div>
      <div className="column">
        <div className="movie-details">
          <h2 className="title">
            {movie.title} <span className="year">({movie.year})</span>
          </h2>
          <div className="supporting-details">
            {movie.rated} | {movie.runtime} | {movie.genre} | {movie.released}
          </div>
        </div>
        <Ratings movie={movie} />
        <div>
          <div className="plot">
            {movie.plot && (
              <p>
                <strong>Summary:</strong> {movie.plot}
              </p>
            )}
            {movie.director && (
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
            )}
            {movie.writer && (
              <p>
                <strong>Writer:</strong> {movie.writer}
              </p>
            )}
            {movie.actors && (
              <p>
                <strong>Actors:</strong> {movie.actors}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MovieDetailsModalFallback() {
  return null;
}
