import { Flipped } from 'react-flip-toolkit';

import { useSearchTerm } from '../utils/hooks';
import { Search } from './Search';
import { Sparkles } from './Sparkles';

import './Header.css';

export function Header() {
  const searchTerm = useSearchTerm();

  return (
    <div className={`header ${searchTerm ? 'center-children-shift' : 'center-children'}`}>
      <div className="side-item">
        <Flipped flipId="awards">
          <Sparkles disabled={!!searchTerm}>
            <img className="awards" alt="scene of awards ceremony" src="/awards.svg" />
          </Sparkles>
        </Flipped>
        <Flipped flipId="title">
          <h1 className="title">the shoppies</h1>
        </Flipped>
      </div>
      <Flipped flipId="search-input">
        <div className="search-container">
          <Search />
        </div>
      </Flipped>
      <div className="side-item"></div>
    </div>
  );
}
