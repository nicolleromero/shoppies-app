import { useRecoilState, useRecoilValue, RecoilState } from 'recoil';

import { movieListState, nominationListState } from '../recoil/atoms';
import { Item } from '../utils/omdb';

import './DeleteButton.css';

type Props = {
  atom: RecoilState<Item[]>;
  item: Item;
};

export function DeleteButton(props: Props) {
  const nominationList = useRecoilValue(nominationListState);
  const [movieList, setMovieList] = useRecoilState(movieListState);
  const [list, setList] = useRecoilState(props.atom);
  const itemId = props.item.id;

  function handleDeleteMovie() {
    if (nominationList.some((item) => item.id === itemId)) {
      const updatedMovieList = [props.item, ...movieList];

      setMovieList(updatedMovieList);
    }

    const updatedList = list.filter((item) => item.id !== itemId);
    setList(updatedList);
  }

  return (
    <button className="delete-button" onClick={() => handleDeleteMovie()}>
      ✕
    </button>
  );
}
