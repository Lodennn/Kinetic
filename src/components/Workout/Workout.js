import { Fragment } from "react";
import SpecialWorkout from "../SpecialWorkout/SpecialWorkout";
import WorkoutItem from "../WorkoutItem/WorkoutItem";

const Workout = (props) => {
  return (
    <Fragment>
      {props.isSpecialWorkout ? (
        <SpecialWorkout {...props} />
      ) : (
        <WorkoutItem {...props} mainWorkout />
      )}
    </Fragment>
  );
};

export default Workout;
