import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '../recoil/atoms';

import './Search.css';

export function Search() {
  const [search, setSearchTerm] = useRecoilState(searchState);
  const [title, setTitle] = useState('');

  function handleSetSearchTerm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSearchTerm(title);
  }

  return (
    <form onSubmit={handleSetSearchTerm}>
      <div className="embed-submit-field">
        <input
          type="text"
          placeholder="Enter the title of a movie"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="button-submit" type="submit" disabled={!title.trim()}>
          Send
        </button>
      </div>
    </form>
  );
}
