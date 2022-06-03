import { Flipped } from 'react-flip-toolkit';

import { useSearchTerm } from '../utils/hooks';
import { Search } from './Search';
import { Sparkles } from './Sparkles';

import countdown from '../images/countdown.gif';

import './Header.css';

export function Header() {
  const searchTerm = useSearchTerm();

  return (
    <div className={`header ${searchTerm ? 'center-children-shift' : 'center-children'}`}>
      <div className="side-item">
        <Flipped flipId="awards">
          <img className="rounded" alt="countdown" src={countdown} />
        </Flipped>
        <Flipped flipId="title">
          <Sparkles disabled={!!searchTerm}>
            <h1 className="title">Movie db</h1>
          </Sparkles>
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
