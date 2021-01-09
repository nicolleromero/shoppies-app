import { Spotlights } from './Spotlights';

import './SuccessBar.css';

export function SuccessBar() {
  return (
    <div className="success-bar">
      <p className="success-text">
        Congratulations! You've completed your nominations!<span className="star">💫</span>
      </p>
      <Spotlights />
    </div>
  );
}
