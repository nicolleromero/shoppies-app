import { useSetRecoilState } from 'recoil';
import { hiddenListState, nominationListState } from '../recoil/atoms';

import './SuccessBar.css';

export function SuccessBar() {
  const setHiddenList = useSetRecoilState(hiddenListState);
  const setNominationList = useSetRecoilState(nominationListState);

  function handleReset() {
    setHiddenList([]);
    setNominationList([]);
  }

  return (
    <div className="success-bar">
      {/* <img className="statue" src="../statue.png" alt="" /> */}
      <p className="success-text">
        Congratulations! You've completed your nominations!<span className="star">💫</span>
      </p>
      <button className="reset-button" onClick={handleReset}>
        (Start Over)
      </button>
    </div>
  );
}
