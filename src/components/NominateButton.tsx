import React from 'react';

import './NominateButton.css';

type Props = {
  text: string;
  disabled: boolean;
  onClick: () => void;
};

export function NominateButton(props: Props) {
  return (
    <button className="nominate-button" disabled={props.disabled} onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
}
