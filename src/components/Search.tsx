import React, { useLayoutEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import { hiddenListState } from '../recoil/atoms';
import { useSearchTerm } from '../utils/hooks';

import './Search.css';

export function Search() {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const searchTerm = useSearchTerm();
  const [value, setValue] = useState(searchTerm);
  let history = useHistory();

  useLayoutEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  function handleSetSearchTerm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHiddenList([]);

    const query = value.trim().replace(/\s+/g, ' ');
    history.push(`/?q=${encodeURIComponent(query)}`);
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
