import React from 'react';

import './CallToActionBar.css';

export function CallToActionBar() {
  return (
    <div className="call-to-action-bar">
      <img className="statue" src="../statue.png" alt="" />
      <p>
        Welcome to the home of the shoppies! Nominate <span className="number">5</span> movies to
        receive a shoppie award!
      </p>
      <img className="statue" src="../statue.png" alt="" />
    </div>
  );
}
