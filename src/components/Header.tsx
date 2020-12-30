import { Flipped } from 'react-flip-toolkit';

import { useSearchTerm } from '../utils/hooks';
import { Search } from './Search';

import './Header.css';

export function Header() {
  const searchTerm = useSearchTerm();

  return (
    <div className={searchTerm ? 'center-children-shift' : 'center-children'}>
      <Flipped flipId="awards">
        <img
          className={searchTerm ? 'awards-shift' : 'awards'}
          alt="scene of awards ceremony"
          src="/awards.svg"
        />
      </Flipped>
      <Flipped flipId="title">
        <h2 className={searchTerm ? 'title-shift' : 'title'}>the shoppies</h2>
      </Flipped>
      <Flipped flipId="search-input">
        <div className={searchTerm ? 'input-shift' : ''}>
          <Search />
        </div>
      </Flipped>
    </div>
  );
}
