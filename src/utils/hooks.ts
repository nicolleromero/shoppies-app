import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { random } from './helpers';

export function useSearchTerm() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  return query || '';
}

export function useSelectedMovieId() {
  const location = useLocation();
  const movieId = new URLSearchParams(location.search).get('movie');

  return movieId || '';
}

export function useBasePath(params?: Record<string, string>) {
  const location = useLocation();
  const searchTerm = useSearchTerm();
  const searchParams = new URLSearchParams();

  // Default to always including the search query
  if (searchTerm) {
    searchParams.set('q', searchTerm);
  }

  if (params) {
    for (const key in params) {
      searchParams.set(key, params[key]);
    }
  }

  const queryString = searchParams.toString();
  return location.pathname + (queryString ? `?${queryString}` : '');
}

// Credit to: https://www.joshwcomeau.com/react/animated-sparkles-in-react/
export function useRandomInterval(callback: () => void, minDelay: number, maxDelay: number) {
  const timeoutId = useRef<number | undefined>();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    let isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number';
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };

      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);

  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);

  return cancel;
}
