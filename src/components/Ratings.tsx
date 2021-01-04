import { MovieDetails } from '../utils/omdb';

import './Ratings.css';

type Props = {
  movie: MovieDetails;
};

const scoreColor = (metascore: number) => {
  if (metascore >= 80) {
    return 'green';
  } else if (metascore <= 60) {
    return 'red';
  } else {
    return 'yellow';
  }
};

export function Ratings(props: Props) {
  const { imdbRating, metascore, rottenTomatoes } = props.movie;

  return (
    <div className="ratings">
      {rottenTomatoes && (
        <div className="ratings-score">
          <span className={rottenTomatoes >= 60 ? 'tomato-icon' : 'splat-icon'} />
          {rottenTomatoes}%
        </div>
      )}
      {imdbRating && (
        <div className="ratings-score">
          <span className="imdb-logo" />
          {imdbRating}/10
        </div>
      )}
      {metascore && (
        <div className="ratings-score">
          <span className={`metacritic-score ${scoreColor(metascore)}`}>{metascore}</span>{' '}
          Metacritic
        </div>
      )}
    </div>
  );
}
