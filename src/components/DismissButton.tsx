import { useHistory } from 'react-router-dom';

import { useBasePath } from '../utils/hooks';
import { DeleteButton } from './DeleteButton';

import './DismissButton.css';

export function DismissButton() {
  const path = useBasePath();
  const history = useHistory();

  function handleClick() {
    history.push(path);
  }

  return <DeleteButton className="dismiss-button" onClick={handleClick} />;
}
