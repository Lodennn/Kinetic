import React, { forwardRef } from "react";
import SmartSearch from "../../core-ui/SmartSearch/SmartSearch";
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
    superSetNumOfSets,
    onBlur,
    setFieldValue,
    allDayWorkouts,
  } = props;

  return (
    <div className="set-type__form--super" ref={ref}>
      <div className="form-group">
        {toUse !== "read" ? (
          <>
            <SmartSearch
              input={{
                type: "text",
                className: `form-control kinetic-input kinetic-input--white mb-xs ${className}`,
                placeholder: "Workout Name",
                name: "superSetWorkoutName",
                value: superSetWorkoutName,
                onChange: onChangeWorkoutName,
                onBlur: onBlur,
              }}
              setFieldValue={setFieldValue}
              data={allDayWorkouts}
            />
            <p className="error-message">
              {renderErrorMessage(errors, "superSetWorkoutName")}
            </p>
          </>
        ) : (
          <div className="form-control kinetic-input kinetic-input--white mb-lg title-5">
            {superSetWorkoutName}
          </div>
        )}
      </div>
      <div className={`form-group-flex mt-auto`}>
        <h4 className="title-5 text-uppercase">Num of sets: </h4>
        <div className="title-1">{sets.length}</div>
      </div>
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
        {sets.map((set, idx) => {
          return (
            <AddSet
              id={idx}
              key={idx}
              disabled={
                toUse === "edit" || toUse === "read"
                  ? false
                  : !(idx <= superSetNumOfSets.filledSets)
              }
              reps={set.reps}
              weight={set.weight}
              weightUnit={set.weightUnit}
              showModalHandler={toUse !== "read" && showModalForSuperSets}
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
