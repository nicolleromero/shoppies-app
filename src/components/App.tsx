import React from 'react';

import { FlipRoot } from './FlipRoot';
import { Footer } from './Footer';
import { Header } from './Header';
import { MovieList } from './MovieList';

import './App.css';

export default function App() {
  return (
    <FlipRoot className="site-wrapper">
      <div>
        <Header />
        <MovieList />
      </div>
      <Footer />
    </FlipRoot>
  );
}
