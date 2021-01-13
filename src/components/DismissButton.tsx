import { useHistory } from 'react-router-dom';

import { useHomepagePath } from '../utils/hooks';
import { DeleteButton } from './DeleteButton';

import './DismissButton.css';

export function DismissButton() {
  const path = useHomepagePath();
  const history = useHistory();

  function handleClick() {
    history.push(path);
  }

  return <DeleteButton className="dismiss-button" onClick={handleClick} />;
}
