import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { hiddenListState, searchState } from '../recoil/atoms';

import './Search.css';

export function Search() {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchState);
  const [title, setTitle] = useState(searchTerm);

  function handleSetSearchTerm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHiddenList([]);
    setSearchTerm(title.trim().replace(/\s+/g, ' '));
  }

  return (
    <form className="search-field" onSubmit={handleSetSearchTerm}>
      <input
        type="text"
        placeholder="Enter the title of a movie"
        value={title}
        aria-label="search term input"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="button-submit"
        type="submit"
        disabled={!title.trim()}
        aria-label="submit search"
      >
        SEARCH
      </button>
    </form>
  );
}
