import React from "react";
import classes from "./SpecialWorkout.module.scss";

import WorkoutBadge from "../../core-ui/WorkoutBadge/WorkoutBadge";
import WorkoutItem from "../WorkoutItem/WorkoutItem";

const SpecialWorkout = (props) => {
  let workoutBadgeType = !!props.superSet.workoutName ? "super" : "drop";

  return (
    <div
      className={`${classes["special-workout"]} ${
        classes[`special-workout--${props.setType}`]
      }`}
    >
      <span className={classes["special-workout__set-wrapper"]}>
        {<WorkoutBadge type={workoutBadgeType} size="lg" color={"white"} />}
      </span>

      {/** MAIN WORKOUT */}
      <WorkoutItem {...props} mainWorkout />

      {/** SPECIAL WORKOUT */}
      <WorkoutItem {...props} />
    </div>
  );
};

export default SpecialWorkout;
