import { useSetRecoilState } from 'recoil';
import { hiddenListState, nominationListState } from '../recoil/atoms';

import './ResetButton.css';

export function ResetButton() {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const setNominationList = useSetRecoilState(nominationListState);

  function handleReset() {
    // Reset all hidden movies and nominations.
    setHiddenList([]);
    setNominationList([]);
  }
  return (
    <div className="center-reset-button">
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
