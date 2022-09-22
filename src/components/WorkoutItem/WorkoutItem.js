import WorkoutBadge from "../../core-ui/WorkoutBadge/WorkoutBadge";
import classes from "./WorkoutItem.module.scss";

import { ReactComponent as EditWorkoutIcon } from "../../assets/icons/EDIT.svg";
import { ReactComponent as DeleteWorkoutIcon } from "../../assets/icons/TRASH.svg";
import { useDispatch } from "react-redux";
import {
  deleteWorkoutAction,
  workoutsActions,
} from "../../store/workouts/workouts-slice";

const WorkoutItem = (props) => {
  const dispatch = useDispatch();

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

  const displayTotalNumberOfWeights = () => {
    let totalNumberOfWeight = "";
    if (props.isSpecialWorkout) {
      if (props.dropSet.numberOfSets && !props.mainWorkout) {
        totalNumberOfWeight = props.dropSet.totalNumberOfWeight;
      } else if (props.superSet.numberOfSets && !props.mainWorkout) {
        totalNumberOfWeight = props.superSet.totalNumberOfWeight;
      } else {
        totalNumberOfWeight = props.totalNumberOfWeight;
      }
    } else {
      totalNumberOfWeight = props.totalNumberOfWeight;
    }
    return totalNumberOfWeight;
  };

  const displayTotalNumberOfReps = () => {
    let totalNumberOfReps = "";
    if (props.isSpecialWorkout) {
      if (props.dropSet.numberOfSets && !props.mainWorkout) {
        totalNumberOfReps = props.dropSet.totalNumberOfReps;
      } else if (props.superSet.numberOfSets && !props.mainWorkout) {
        totalNumberOfReps = props.superSet.totalNumberOfReps;
      } else {
        totalNumberOfReps = props.totalNumberOfReps;
      }
    } else {
      totalNumberOfReps = props.totalNumberOfReps;
    }
    return totalNumberOfReps;
  };

  const displayTotalNumberOfSets = () => {
    let totalNumberOfSets = "";
    if (props.isSpecialWorkout) {
      if (props.dropSet.numberOfSets && !props.mainWorkout) {
        totalNumberOfSets = props.dropSet.numberOfSets;
      } else if (props.superSet.numberOfSets && !props.mainWorkout) {
        totalNumberOfSets = props.superSet.numberOfSets;
      } else {
        totalNumberOfSets = props.numberOfSets;
      }
    } else {
      totalNumberOfSets = props.numberOfSets;
    }
    return totalNumberOfSets;
  };

  const displayProgressStateBadge = () => {
    if (props.progressState < 0) return null;

    let progressStateType = "down";

    if (props.progressState === 0) {
      progressStateType = "fixed";
    } else if (props.progressState === 1) {
      progressStateType = "up";
    } else if (props.progressState === 2) {
      progressStateType = "down";
    }

    return (
      <li className={classes["workout-item__header-badge"]}>
        <WorkoutBadge type={progressStateType} />
      </li>
    );
  };

  const deleteWorkoutHandler = () => {
    dispatch(deleteWorkoutAction({ documentId: props.id }));
  };

  return (
    <div className={`${classes["workout-item"]}`}>
      {props.mainWorkout && (
        <header className={classes["workout-item__header"]}>
          <ul className={classes["workout-item__header-badges"]}>
            {displayProgressStateBadge()}
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
          Sets: <span>{displayTotalNumberOfSets()}</span>
        </div>
        <div className={classes["workout-item__info"]}>
          Total Reps: <span>{displayTotalNumberOfReps()}</span>
        </div>
        <div className={classes["workout-item__info"]}>
          Total Weight Lifted: <span>{displayTotalNumberOfWeights()}</span>
        </div>
      </footer>
      {props.mainWorkout && (
        <div className={classes["workout-item__actions"]}>
          <div className={classes["workout-item__actions--edit"]}>
            <button onClick={props.onEdit.bind(null, props)}>
              <EditWorkoutIcon />
            </button>
          </div>
          <div className={classes["workout-item__actions--delete"]}>
            <button onClick={deleteWorkoutHandler.bind(null, props.id)}>
              <DeleteWorkoutIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutItem;
