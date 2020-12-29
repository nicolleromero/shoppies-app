import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import { searchState } from '../recoil/atoms';
import { FlipRoot } from './FlipRoot';
import { Footer } from './Footer';
import { MovieList } from './MovieList';
import { Search } from './Search';
import { Spinner } from './Spinner';

import './App.css';

export default function App() {
  const searchTerm = useRecoilValue(searchState);

  return (
    <FlipRoot className="site-wrapper">
      <div>
        <div className={searchTerm ? 'center-children-shift' : 'center-children'}>
          <img
            className={searchTerm ? 'awards-shift' : 'awards'}
            alt=""
            src="/awards.svg"
            aria-label="awards-scene"
          />
          <h2 className={searchTerm ? 'title-shift' : 'title'}>the shoppies</h2>
          <div className={searchTerm ? 'input-shift' : ''}>
            <Search />
          </div>
        </div>
        <Suspense fallback={<Spinner />}>
          <MovieList />
        </Suspense>
      </div>
      <Footer />
    </FlipRoot>
  );
}
