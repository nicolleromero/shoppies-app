import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import { Item } from '../utils/omdb';

import './Poster.css';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  item: Item;
};

type XYS = readonly [number, number, number];

const trans = (x: number, y: number, s: number) =>
  `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export function Poster({ item, ...props }: Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  const [springProps, set] = useSpring<{ xys: XYS }>(() => ({
    xys: [0, 0, 1] as const,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const calc = (x: number, y: number): XYS => {
    const element = elementRef.current;
    if (!element) {
      return [0, 0, 1];
    }

    const rect = element.getBoundingClientRect();
    y -= rect.y;
    x -= rect.x;

    return [-(y - rect.height / 2) / 20, (x - rect.width / 2) / 20, 1.04];
  };

  return (
    <animated.div
      {...props}
      className="poster"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      ref={elementRef}
      style={{ transform: springProps.xys.interpolate(trans as any) }}
    >
      <img
        className="poster"
        alt=""
        src={item.image !== 'N/A' ? item.image : '/movie_poster.png'}
      />
      {props.children}
    </animated.div>
  );
}
