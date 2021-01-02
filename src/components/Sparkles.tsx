import React, { useState } from 'react';

import { useRandomInterval } from '../utils/hooks';
import { random, range } from '../utils/helpers';

import './Sparkles.css';

const DEFAULT_COLOR = '#FFC700';

type Props = {
  color?: string;
  children?: React.ReactNode;
  className?: string;
};

export function Sparkles({ color = DEFAULT_COLOR, children, className = '', ...props }: Props) {
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle(color));
  });

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    50,
    450,
  );

  return (
    <div className={`sparkle-wrapper ${className}`} {...props}>
      {children}
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} color={sparkle.color} size={sparkle.size} style={sparkle.style} />
      ))}
    </div>
  );
}

type SparkleProps = {
  color: string;
  size: number;
  style: React.CSSProperties;
};

function Sparkle({ color, size, style }: SparkleProps) {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';

  return (
    <div className="sparkle-svg-wrapper" style={style}>
      <svg className="sparkle-svg" width={size} height={size} viewBox="0 0 68 68" fill="none">
        <path d={path} fill={color} />
      </svg>
    </div>
  );
}

function generateSparkle(color: string) {
  const size = random(10, 20);

  return {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size,
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      marginTop: -size / 2,
      marginLeft: -size / 2,
    },
  };
}
