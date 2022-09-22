import React, { forwardRef } from "react";
import WorkoutDataItem from "../../core-ui/WorkoutDataItem/WorkoutDataItem";
import { renderErrorMessage } from "../../helpers/form";
import AddSet from "../AddSet/AddSet";

const Superset = forwardRef((props, ref) => {
  const {
    sets,
    showModalForSuperSets,
    superSetWorkoutName,
    totalNumberOfWeight,
    totalNumberOfReps,
    toUse,
    onChangeWorkoutName,
    errors,
    className,
  } = props;

  return (
    <div className="set-type__form--super" ref={ref}>
      <div className="form-group">
        {toUse !== "read" ? (
          <>
            <input
              type="text"
              name="superSetWorkoutName"
              className={`form-control kinetic-input kinetic-input--white mb-lg ${className}`}
              placeholder="Workout Name"
              onChange={onChangeWorkoutName}
            />
            <p className="error-message">
              {renderErrorMessage(errors, "superSetWorkoutName")}
            </p>
          </>
        ) : (
          <div className="form-control kinetic-input kinetic-input--white mb-lg">
            {superSetWorkoutName}
          </div>
        )}
      </div>
      <div className={`form-group-flex mt-auto`}>
        <h4 className="title-4 text-uppercase">Num of sets: </h4>
        <div>{sets.length}</div>
      </div>
      <div style={{ display: "flex", gap: "3rem" }}>
        {sets.map((set, idx) => {
          return (
            <AddSet
              id={idx}
              key={idx}
              reps={set.reps}
              weight={set.weight}
              weightUnit={set.weightUnit}
              showModalHandler={showModalForSuperSets}
            />
          );
        })}
      </div>
      {toUse === "read" && (
        <div className="mt-xxg flex gap-sm">
          <WorkoutDataItem type="weight" data={totalNumberOfWeight} />
          <WorkoutDataItem type="reps" data={totalNumberOfReps} />
        </div>
      )}
    </div>
  );
});

export default Superset;
