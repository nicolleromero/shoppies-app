import React from 'react';
import ContentLoader from 'react-content-loader';
import { Flipped } from 'react-flip-toolkit';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import { Movie } from '../utils/omdb';

import './Poster.css';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  movie?: Movie;
  empty?: boolean;
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

export function Poster({ movie, empty, ...props }: Props) {
  const [springProps, set] = useSpring<{ xys: XYS }>(() => ({
    xys: [0, 0, 1] as const,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  if (empty || !movie) {
    return (
      <div {...props} className={`poster ${empty ? 'empty' : ''}`}>
        {!empty && <PosterGlimmer />}
      </div>
    );
  }

  return (
    <Flipped flipId={movie.id}>
      <Link to={`/movie/${movie.id}`}>
        <div {...props} className="poster">
          <animated.div
            {...props}
            className="poster-inner"
            onMouseMove={(event) =>
              set({ xys: calc(event.currentTarget, event.clientX, event.clientY) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: springProps.xys.interpolate(trans as any) }}
          >
            <img
              src={movie.image !== 'N/A' ? movie.image : '/movie_poster.png'}
              alt={movie.title}
            />
            {props.children}
          </animated.div>
        </div>
      </Link>
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
