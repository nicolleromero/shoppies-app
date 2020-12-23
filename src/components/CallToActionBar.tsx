import './CallToActionBar.css';

export function CallToActionBar() {
  return (
    <div className="call-to-action-bar">
      <img className="statue" src="../statue.png" alt="" />
      <p className="text">
        Welcome to the home of the shoppies! Select <span className="number">5</span> movies you'd
        like to nominate to receive a shoppie award!
      </p>
    </div>
  );
}
