import { MAX_NOMINATIONS } from '../constants';
import { Sparkles } from './Sparkles';

import statueIcon from '../images/statue-icon.png';

import './CallToActionBar.css';

export function CallToActionBar() {
  return (
    <div className="call-to-action-bar">
      <img className="statue" src={statueIcon} alt="awards statue" />
      <Sparkles>
        <p className="text">
          Welcome to Movie db! Select <span className="number">{MAX_NOMINATIONS}</span> movies that
          you think are awesome!
        </p>
      </Sparkles>
    </div>
  );
}
