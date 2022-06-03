import React from 'react';
import { useRecoilValue } from 'recoil';

import { FlipRoot } from './FlipRoot';
import { Footer } from './Footer';
import { Header } from './Header';
import { MovieDetailsModal } from './MovieDetailsModal';
import { GithubCorner } from './GithubCorner';
import { MovieList } from './MovieList';

import { nominationState } from '../recoil/atoms';

export default function App() {
  const nominationAllowed = useRecoilValue(nominationState);

  return (
    <FlipRoot>
      <GithubCorner />
      <div>
        <Header />
        <MovieList />
      </div>

      {nominationAllowed && <Footer />}

      <MovieDetailsModal />
    </FlipRoot>
  );
}
