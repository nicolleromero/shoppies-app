import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Search } from './Search';
import { Spinner } from './Spinner';
import { MovieList } from './MovieList';
import { NominationsList } from './NominationsList';
import { getList } from '../utils/omdb';
import { movieListState, searchState, loadingState } from '../recoil/atoms';

import './App.css';

export default function App() {
  const [list, setList] = useRecoilState(movieListState);
  const searchTerm = useRecoilValue(searchState);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    let mounted = true;

    if (!searchTerm) {
      return () => {
        mounted = false;
      };
    }

    getList(searchTerm)
      .then((items) => {
        if (mounted) {
          setList(items);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [searchTerm]);

  return (
    <div className="site-wrapper">
      <div>
        <div className="center-children">
          <div role="img" aria-label="title" className="title">
            <img className="banner" alt="" src="/title.png" />
          </div>
          <div>
            <Search />
          </div>
        </div>
        {searchTerm && loading && <Spinner />}
        {list.length > 0 && <MovieList />}
      </div>
      <NominationsList />
    </div>
  );
}
