import React from 'react';
import { Route } from 'react-router-dom';

import { FlipRoot } from './FlipRoot';
import { Footer } from './Footer';
import { Header } from './Header';
import { MovieDetailsModal } from './MovieDetailsModal';
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

      <Route path="/movie/:id">{(props) => <MovieDetailsModal {...props} />}</Route>
    </FlipRoot>
  );
}
