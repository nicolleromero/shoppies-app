import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { useSpring, animated } from 'react-spring';

import { Movie } from '../utils/omdb';
import { Placeholder } from './Placeholder';

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

  if (!movie) {
    return <div {...props} className={`poster ${empty ? 'placeholder' : 'loading'}`} />;
  }

  return (
    <Flipped flipId={movie.id}>
      <div {...props} className="poster">
        {!empty && (
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
        )}
        {empty && <Placeholder />}
      </div>
    </Flipped>
  );
}
