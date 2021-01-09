import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useRecoilValue } from 'recoil';

import { MAX_NOMINATIONS } from '../constants';
import { nominationListState } from '../recoil/atoms';

import { CallToActionBar } from './CallToActionBar';
import { NominationsList } from './NominationsList';
import { ResetButton } from './ResetButton';
import { SuccessBar } from './SuccessBar';

import './Footer.css';

export function Footer() {
  const list = useRecoilValue(nominationListState);

  return (
    <>
      <div className={list.length === MAX_NOMINATIONS ? 'footer complete' : 'footer'}>
        {!list.length ? (
          <CallToActionBar />
        ) : (
          <>
            {list.length === MAX_NOMINATIONS && <SuccessBar />}
            <NominationsList />
            {list.length === MAX_NOMINATIONS && <ResetButton />}
          </>
        )}
      </div>

      {list.length > 0 && (
        // Only render tooltip once nominated movies are present so styles are injected
        // at the right time.
        <ReactTooltip place="top" type="dark" effect="solid" aria-haspopup="true" />
      )}
    </>
  );
}
