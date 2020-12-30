import React, { Suspense } from 'react';

import { FlipRoot } from './FlipRoot';
import { Footer } from './Footer';
import { Header } from './Header';
import { MovieList } from './MovieList';
import { Spinner } from './Spinner';

import './App.css';

export default function App() {
  return (
    <FlipRoot className="site-wrapper">
      <div>
        <Header />
        <Suspense fallback={<Spinner />}>
          <MovieList />
        </Suspense>
      </div>
      <Footer />
    </FlipRoot>
  );
}
