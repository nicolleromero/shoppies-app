import React, { useLayoutEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { hiddenListState } from '../recoil/atoms';
import { useBasePath, useSearchTerm } from '../utils/hooks';

import './Search.css';

export function Search() {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const searchTerm = useSearchTerm();
  const [value, setValue] = useState(searchTerm);
  const normalizedValue = value.trim().replace(/\s+/g, ' ');
  const searchPath = useBasePath({ q: normalizedValue });
  let history = useHistory();

  // Change input value to match search term when browser navigation occurs
  useLayoutEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  function handleSetSearchTerm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Reset which movies were hidden for every new search
    setHiddenList([]);

    history.push(searchPath);
  }

  return (
    <form className="search-field" onSubmit={handleSetSearchTerm}>
      <input
        type="text"
        placeholder="Enter the title of a movie"
        value={value}
        aria-label="search term input"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="button-submit"
        type="submit"
        disabled={!value.trim()}
        aria-label="submit search"
      >
        Search
      </button>
    </form>
  );
}
