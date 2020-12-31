import { useSetRecoilState } from 'recoil';
import { hiddenListState, nominationListState } from '../recoil/atoms';

import './SuccessBar.css';

export function SuccessBar() {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const setNominationList = useSetRecoilState(nominationListState);

  function handleReset() {
    // Reset all hidden movies and nominations.
    setHiddenList([]);
    setNominationList([]);
  }

  return (
    <div className="success-bar">
      <p className="success-text">
        Congratulations! You've completed your nominations!<span className="star">💫</span>
      </p>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
