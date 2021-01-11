import React from 'react';

import { FlipRoot } from './FlipRoot';
import { Footer } from './Footer';
import { Header } from './Header';
import { MovieDetailsModal } from './MovieDetailsModal';
import { GithubCorner } from './GithubCorner';
import { MovieList } from './MovieList';

export default function App() {
  return (
    <FlipRoot>
      <GithubCorner />
      <div>
        <Header />
        <MovieList />
      </div>

      <Footer />

      <MovieDetailsModal />
    </FlipRoot>
  );
}
