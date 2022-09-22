import classes from "./LoadingSpinner.module.scss";

const LoadingSpinner = (props) => {
  const sizeClass = props.size ? classes[`lds-ring--${props.size}`] : null;
  return (
    <div className={`${classes["lds-ring"]} ${sizeClass}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default LoadingSpinner;
