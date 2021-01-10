import React from 'react';

import { FlipRoot } from './FlipRoot';
import { Footer } from './Footer';
import { Header } from './Header';
import { MovieDetailsModal } from './MovieDetailsModal';
import { GithubCorner } from './GithubCorner';
import { MovieList } from './MovieList';

import './App.css';

export default function App() {
  return (
    <FlipRoot className="site-wrapper">
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
