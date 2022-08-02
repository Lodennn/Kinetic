import { Link } from "react-router-dom";
import classes from "./Day.module.scss";

const Day = (props) => {
  return (
    <div className={classes.day}>
      <Link to={`/day/${props.programId}/${props.id}`}>
        <span className={classes["day__sub-title"]}>Day</span>
        <h4 className={classes["day__title"]}>{props.dayName}</h4>
      </Link>
    </div>
  );
};

export default Day;
