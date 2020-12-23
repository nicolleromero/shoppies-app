import { useSetRecoilState } from 'recoil';
import { nominationListState } from '../recoil/atoms';

import './SuccessBar.css';

export function SuccessBar() {
  const setList = useSetRecoilState(nominationListState);

  return (
    <div className="success-bar">
      {/* <img className="statue" src="../statue.png" alt="" /> */}
      <p className="success-text">
        Congratulations! You've completed your nominations!<span className="star">💫</span>
      </p>
      <button className="reset-button" onClick={() => setList([])}>
        (Start Over)
      </button>
    </div>
  );
}
