export function Button(props) {
  return (
    <button className="nominate-button" disabled={props.disabled} onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
}
