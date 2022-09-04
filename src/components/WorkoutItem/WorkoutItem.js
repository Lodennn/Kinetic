import WorkoutBadge from "../../core-ui/WorkoutBadge/WorkoutBadge";
import classes from "./WorkoutItem.module.scss";

import { ReactComponent as EditWorkoutIcon } from "../../assets/icons/EDIT.svg";
import { ReactComponent as DeleteWorkoutIcon } from "../../assets/icons/TRASH.svg";

const WorkoutItem = (props) => {
  const displayWorkoutName = () => {
    let workoutName = "";
    if (props.isSpecialWorkout) {
      if (props.dropSet.numberOfSets && !props.mainWorkout) {
        workoutName = null;
      } else if (props.superSet.numberOfSets && !props.mainWorkout) {
        workoutName = props.superSet.workoutName;
      } else {
        workoutName = props.workoutName;
      }
    } else {
      workoutName = props.workoutName;
    }
    return workoutName;
  };
  return (
    <div className={`${classes["workout-item"]}`}>
      {props.mainWorkout && (
        <header className={classes["workout-item__header"]}>
          <ul className={classes["workout-item__header-badges"]}>
            <li className={classes["workout-item__header-badge"]}>
              <WorkoutBadge type="up" />
            </li>
            <li className={classes["workout-item__header-badge"]}>
              <WorkoutBadge type="down" />
            </li>
            <li className={classes["workout-item__header-badge"]}>
              <WorkoutBadge type="super" />
            </li>
            <li className={classes["workout-item__header-badge"]}>
              <WorkoutBadge type="drop" />
            </li>
          </ul>
        </header>
      )}
      <div className={classes["workout-item__body"]}>
        <h4 onClick={props.onClick.bind(null, props)}>
          {displayWorkoutName()}
        </h4>
      </div>
      <footer className={classes["workout-item__footer"]}>
        <div className={classes["workout-item__info"]}>
          Total Reps: <span>{props.totalNumberOfReps}</span>
        </div>
        <div className={classes["workout-item__info"]}>
          Sets: <span>{props.numberOfSets}</span>
        </div>
      </footer>
      {props.mainWorkout && (
        <div className={classes["workout-item__actions"]}>
          <div className={classes["workout-item__actions--edit"]}>
            <EditWorkoutIcon />
          </div>
          <div className={classes["workout-item__actions--delete"]}>
            <DeleteWorkoutIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutItem;
