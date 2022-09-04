import classes from "./SecondaryButton.module.scss";

const SecondaryButton = (props) => {
  return (
    <button
      className={`${classes["secondary-btn"]} ${
        classes[`secondary-btn--${props.variant}`]
      }`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default SecondaryButton;
