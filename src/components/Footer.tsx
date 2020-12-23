import React from 'react';
import { useRecoilValue } from 'recoil';

import { MAX_NOMINATIONS } from '../constants';
import { nominationListState } from '../recoil/atoms';
import { NominationsList } from './NominationsList';
import { CallToActionBar } from './CallToActionBar';
import { SuccessBar } from './SuccessBar';

import './Footer.css';

export function Footer() {
  const list = useRecoilValue(nominationListState);

  return (
    <div className="footer">
      {!list.length ? (
        <CallToActionBar />
      ) : (
        <>
          {list.length === MAX_NOMINATIONS && <SuccessBar />}
          <NominationsList />
        </>
      )}
    </div>
  );
}
