import { useLocation } from 'react-router-dom';

export function useSearchTerm() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  return query || '';
}
