import React from 'react';
import { useSpring, animated } from 'react-spring';

import { Item } from '../utils/omdb';

import './MoviePosterSpring.css';

type Props = {
  item: Item;
};

type XYS = readonly [number, number, number];

const calc = (x: number, y: number): XYS => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.04,
];

const trans = (x: number, y: number, s: number) =>
  `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export function MoviePosterSpring(props: Props) {
  const [springProps, set] = useSpring<{ xys: XYS }>(() => ({
    xys: [0, 0, 1] as const,
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <animated.img
      className="spring-card"
      src={props.item.image}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: springProps.xys.interpolate(trans as any) }}
    />
  );
}
