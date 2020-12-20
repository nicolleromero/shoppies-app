import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '../recoil/atoms';

export default function Search() {
  const [search, setSearchTerm] = useRecoilState(searchState);
  const [title, setTitle] = useState('');

  function handleSetSearchTerm(event) {
    event.preventDefault();

    setSearchTerm(title);
  }

  return (
    <form onSubmit={handleSetSearchTerm}>
      <input
        type="text"
        className="form-field"
        placeholder="Enter the title of a movie"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        variant="outline-secondary inline"
        className="secondary add-button"
        type="submit"
        disabled={!title.trim()}
      >
        Search
      </button>
    </form>
  );
}
