import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { omdbMovieDetails } from '../recoil/selectors';
import { nominationListState } from '../recoil/atoms';
import { DismissButton } from './DismissButton';
import { ErrorBoundary } from './ErrorBoundary';
import { NominateButton } from './NominateButton';
import { Poster } from './Poster';

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
    return null;
  }

  const metascore = movie.ratings[2].Value.slice(0, 2);
  console.log(metascore);

  const rottenTomatoes = Number(movie.ratings[1].Value.slice(0, 2));
  console.log(rottenTomatoes);

  const imdb = movie.ratings[0].Value.slice(0, 3);
  console.log(imdb);

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
        <div>
          <div className="plot">
            <p>
              <strong>Summary:</strong> {movie.plot}
            </p>
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
          <div className="ratings">
            <div className="ratings-score">
              <p>
                <span className="metacrtic-score">{metascore}</span> Metascore
              </p>
            </div>
            <div className="ratings-score">
              <p>
                <span>
                  <img
                    src={rottenTomatoes >= 60 ? '../tomato-icon.png' : '../splat-icon.png'}
                    alt=""
                  />
                </span>
                {rottenTomatoes}%
              </p>
            </div>
            <div className="ratings-score">
              <p>
                <span>
                  <img src="../imdb-logo.png" alt="" />
                </span>
                {imdb}
              </p>
            </div>
          </div>
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
