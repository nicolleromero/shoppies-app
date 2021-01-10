import { Sparkles } from './Sparkles';

import './CallToActionBar.css';

export function CallToActionBar() {
  return (
    <div className="call-to-action-bar">
      <img className="statue" src="../statue_icon_green.png" alt="awards statue" />
      <Sparkles>
        <p className="text">
          Welcome to the home of the Shoppies! Select <span className="number">5</span> movies you'd
          like to nominate to receive a Shoppies award!
        </p>
      </Sparkles>
    </div>
  );
}
