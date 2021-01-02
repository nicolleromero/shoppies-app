import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { random } from './helpers';

export function useSearchTerm() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const lastQuery = useRef(query);

  // Prevent repositining of header coomponents on homepage
  useLayoutEffect(() => {
    if (query) {
      lastQuery.current = query;
    }
  }, [query]);

  return location.pathname === '/' ? query : lastQuery.current;
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
