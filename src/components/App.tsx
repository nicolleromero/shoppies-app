import React, { Suspense } from 'react';

import { FlipRoot } from './FlipRoot';
import { Footer } from './Footer';
import { MovieList } from './MovieList';
import { Search } from './Search';
import { Spinner } from './Spinner';

import './App.css';

export default function App() {
  return (
    <FlipRoot className="site-wrapper">
      <div>
        <div className="center-children">
          <div role="img" aria-label="title" className="title">
            <img className="awards" alt="" src="/awards.svg" />
            <h1 className="title">the shoppies</h1>
          </div>
          <div>
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
