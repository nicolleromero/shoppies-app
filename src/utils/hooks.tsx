import { useRecoilValue } from 'recoil';

import { searchState } from '../recoil/atoms';

export function useSearchTerm() {
  const searchTerm = useRecoilValue(searchState);

  return searchTerm;
}
