import WorkoutBadge from "../../core-ui/WorkoutBadge/WorkoutBadge";
import classes from "./Workout.module.scss";

import { ReactComponent as EditWorkoutIcon } from "../../assets/icons/EDIT.svg";
import { ReactComponent as DeleteWorkoutIcon } from "../../assets/icons/TRASH.svg";

const Workout = (props) => {
  return (
    <div className={classes.workout}>
      <header className={classes["workout__header"]}>
        <ul className={classes["workout__header-badges"]}>
          <li className={classes["workout__header-badge"]}>
            <WorkoutBadge type="up" />
          </li>
          <li className={classes["workout__header-badge"]}>
            <WorkoutBadge type="down" />
          </li>
          <li className={classes["workout__header-badge"]}>
            <WorkoutBadge type="super" />
          </li>
          <li className={classes["workout__header-badge"]}>
            <WorkoutBadge type="drop" />
          </li>
        </ul>
      </header>
      <div className={classes["workout__body"]}>
        <h4>{props.workoutName}</h4>
      </div>
      <footer className={classes["workout__footer"]}>
        <div className={classes["workout__info"]}>
          Total Reps: <span>{props.totalReps}</span>
        </div>
        <div className={classes["workout__info"]}>
          Sets: <span>{props.sets}</span>
        </div>
      </footer>
      <div className={classes["workout__actions"]}>
        <div className={classes["workout__actions--edit"]}>
          <EditWorkoutIcon />
        </div>
        <div className={classes["workout__actions--delete"]}>
          <DeleteWorkoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Workout;
