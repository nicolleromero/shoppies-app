import { useHistory } from 'react-router-dom';
import { useHomepagePath } from '../utils/hooks';

import './DismissButton.css';

export function DismissButton() {
  const path = useHomepagePath();
  const history = useHistory();

  function handleClick() {
    history.push(path);
  }

  return (
    <button className="dismiss-button" onClick={handleClick}>
      ✕
    </button>
  );
}
