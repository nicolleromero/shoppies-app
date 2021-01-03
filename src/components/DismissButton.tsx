import { useHistory } from 'react-router-dom';
import { useSearchTerm } from '../utils/hooks';

import './DismissButton.css';

export function DismissButton() {
  const searchTerm = useSearchTerm();
  const history = useHistory();

  console.log('SearchTerm', searchTerm);

  function handleClick() {
    history.push(`/?q=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <button className="dismiss-button" onClick={handleClick}>
      ✕
    </button>
  );
}
