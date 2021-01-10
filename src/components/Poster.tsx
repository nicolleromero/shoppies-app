import React from 'react';
import ContentLoader from 'react-content-loader';
import { Flipped } from 'react-flip-toolkit';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import { useSearchTerm } from '../utils/hooks';
import { Movie } from '../utils/omdb';

import './Poster.css';

type Props = {
  children?: React.ReactNode;
  clickable?: boolean;
  empty?: boolean;
  movie?: Movie;
  tooltip?: boolean;
};

type XYS = readonly [number, number, number];

const calc = (element: HTMLElement, x: number, y: number): XYS => {
  const rect = element.getBoundingClientRect();
  y -= rect.y;
  x -= rect.x;

  return [-(y - rect.height / 2) / 20, (x - rect.width / 2) / 20, 1.04];
};

const trans = (x: number, y: number, s: number) =>
  `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export function Poster({
  children,
  clickable = true,
  empty = false,
  movie,
  tooltip = false,
}: Props) {
  const searchTerm = useSearchTerm();

  const [springProps, set] = useSpring<{ xys: XYS }>(() => ({
    xys: [0, 0, 1] as const,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  if (empty || !movie) {
    return <div className={`poster ${empty ? 'empty' : ''}`}>{!empty && <PosterGlimmer />}</div>;
  }

  const src = movie.image !== 'N/A' ? movie.image : '/movie_poster.png';
  const tip = tooltip ? `${movie.title} (${movie.year})` : undefined;

  // Change flipId when showing details so there is an animation.
  return (
    <Flipped flipId={movie.id}>
      {clickable ? (
        <Link
          to={`/?q=${encodeURIComponent(searchTerm)}&movie=${encodeURIComponent(movie.id)}`}
          className="poster"
          data-tip={tip}
        >
          <animated.div
            className="poster-inner"
            onMouseMove={(event) =>
              set({ xys: calc(event.currentTarget, event.clientX, event.clientY) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: springProps.xys.interpolate(trans as any) }}
          >
            <img src={src} alt={movie.title} />
            {children}
          </animated.div>
        </Link>
      ) : (
        <div className="poster" data-tip={tip}>
          <div className="poster-inner">
            <img src={src} alt={movie.title} />
            {children}
          </div>
        </div>
      )}
    </Flipped>
  );
}

function PosterGlimmer() {
  return (
    <ContentLoader width="100%" height="100%">
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
    </ContentLoader>
  );
}
