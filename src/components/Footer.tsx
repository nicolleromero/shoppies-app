import React from 'react';
import { useRecoilValue } from 'recoil';
import { nominationListState } from '../recoil/atoms';

import { NominationsList } from './NominationsList';
import { CallToActionBar } from './CallToActionBar';
import { SuccessBar } from './SuccessBar';

import './Footer.css';

export function Footer() {
  const list = useRecoilValue(nominationListState);

  if (!list.length) {
    return <CallToActionBar />;
  } else if (list.length >= 5) {
    return (
      <div className="footer">
        <SuccessBar />
        <NominationsList />
      </div>
    );
  } else {
    return (
      <div className="footer">
        <NominationsList />
      </div>
    );
  }
}
