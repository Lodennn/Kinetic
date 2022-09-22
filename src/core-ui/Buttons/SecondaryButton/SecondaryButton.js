import classes from "./SecondaryButton.module.scss";

const SecondaryButton = (props) => {
  return (
    <button
      className={`${classes["secondary-btn"]} ${
        classes[`secondary-btn--${props.variant}`]
      } ${props.className}`}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButton;
