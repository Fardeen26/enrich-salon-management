import './Button.css';

// eslint-disable-next-line react/prop-types
function Button({ text }) {
  return (
    <button className="button">{text}</button>
  )
}

export default Button;