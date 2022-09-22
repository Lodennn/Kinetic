import classes from "./TargetedMuscle.module.scss";

const TargetedMuscle = (props) => {
  return (
    <div
      className={`${classes["targeted-muscle"]} ${props.activeClassName} ${`targeted-muscle--${props.className}`}`}
      onClick={props.onClick}
    >
      <input
        type="radio"
        id={props.muscle}
        value={props.muscle}
        name={"targetedMuscle"}
        className={classes["targeted-muscle__input"]}
        onChange={props.onChange}
      />
      <span htmlFor={props.muscle}>{props.muscle}</span>
    </div>
  );
};

export default TargetedMuscle;
