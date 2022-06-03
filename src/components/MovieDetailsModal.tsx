import React, { Suspense, useEffect, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useRecoilValue } from 'recoil';

import { MAX_NOMINATIONS } from '../constants';
import { omdbMovieDetails } from '../recoil/selectors';
import { nominationListState } from '../recoil/atoms';
import { useBasePath, useSelectedMovieId } from '../utils/hooks';
import { DismissButton } from './DismissButton';
import { ErrorBoundary } from './ErrorBoundary';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';
import { Ratings } from './Ratings';
import { Ribbon } from './Ribbon';

import { nominationState } from '../recoil/atoms';

import './MovieDetailsModal.css';

type Props = {
  isOpen: boolean;
  movieId: string | null;
};

export function MovieDetailsModal() {
  const movieId = useSelectedMovieId();
  const movieIdRef = useRef(movieId);
  const nominationsList = useRecoilValue(nominationListState);
  const isOpen = !!movieId && nominationsList.length < MAX_NOMINATIONS;

  // Store movieId in movieIdRef to allow modal to fade out when closed
  useEffect(() => {
    if (movieId) {
      movieIdRef.current = movieId;
    }
  }, [movieId]);

  return (
    <ErrorBoundary fallback={<Redirect to="/" />}>
      <Suspense fallback={<MovieDetailsModalFallback />}>
        <MovieDetailsModalContent isOpen={isOpen} movieId={movieId || movieIdRef.current} />
      </Suspense>
    </ErrorBoundary>
  );
}

function MovieDetailsModalContent(props: Props) {
  const { isOpen, movieId } = props;
  const history = useHistory();
  const homepagePath = useBasePath();
  const nominationAllowed = useRecoilValue(nominationState);
  const movie = useRecoilValue(omdbMovieDetails(movieId));
  const nominationsList = useRecoilValue(nominationListState);
  const nominated = nominationsList.some((obj) => obj.id === movieId);

  if (!movie) {
    // Redirect to homepage if movie details not found
    return <Redirect to={homepagePath} />;
  }

  return (
    <ReactModal
      className={nominated ? 'nominated modal' : 'modal'}
      closeTimeoutMS={400}
      isOpen={isOpen}
      overlayClassName="overlay"
      onRequestClose={() => history.push(homepagePath)}
    >
      {nominated && <Ribbon />}

      <div className="column">
        <div className="movie-details">
          <h2 className="title">
            {movie.title} <span className="year">({movie.year})</span>
          </h2>
          <div className="supporting-details">
            {[movie.rated, movie.runtime, movie.genre, movie.released].filter(Boolean).join(' | ')}
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

      <div className="column center">
        <Poster clickable={false} movie={movie}></Poster>
        {nominationAllowed && <NominateButton allowUnnominate={true} movie={movie} />}
      </div>

      <DismissButton />
    </ReactModal>
  );
}

function MovieDetailsModalFallback() {
  return null;
}
