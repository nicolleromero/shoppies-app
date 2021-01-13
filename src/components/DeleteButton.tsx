import './DeleteButton.css';

type Props = {
  className?: string;
  onClick: () => void;
};

export function DeleteButton(props: Props) {
  const { className = '', onClick } = props;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    // Prevent showing movie details.
    event.preventDefault();

    onClick();
  }

  return (
    <button className={`delete-button ${className}`} onClick={handleClick}>
      ✕
    </button>
  );
}
