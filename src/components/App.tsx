import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import Search from './Search';
import MovieList from './MovieList.js';
import NominationsList from './NominationsList.js';
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
      .then((items: []) => {
        if (mounted) {
          setList((list) => items);
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
          <div>
            <h1>The Shoppies</h1>
          </div>
          <div>
            <Search />
          </div>
        </div>
        {searchTerm && loading && (
          <div className="center-children">
            <div>
              {/* <div animation="border" variant="secondary" role="status">
                <span>Loading...</span>
              </div> */}
            </div>
          </div>
        )}
        {list.length > 0 && <MovieList />}
      </div>
      <NominationsList />
    </div>
  );
}
