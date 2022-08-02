import { ReactComponent as SuperSetIcon } from "../../../assets/icons/SUPERSET.svg";
import { ReactComponent as DropSetIcon } from "../../../assets/icons/DROPSET.svg";
import classes from "./PrimaryButton.module.scss";

const PrimaryButton = (props) => {
  //prettier-ignore
  let renderedIcon = props.type === "super" ? <SuperSetIcon className="svg-white" /> : props.type === 'drop' ? <DropSetIcon className="svg-white"/> : null;

  return (
    <button
      className={`${classes["primary-btn"]}`}
      onClick={props.getActiveSetsTypeHandler.bind(null, props.type)}
    >
      <div className={classes["primary-btn__icon"]}>{renderedIcon}</div>
      <span className={`${classes["primary-btn__text"]}`}>
        {props.children}
      </span>
    </button>
  );
};

export default PrimaryButton;
