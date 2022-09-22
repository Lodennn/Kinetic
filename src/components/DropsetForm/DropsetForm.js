import { forwardRef } from "react";
import WorkoutDataItem from "../../core-ui/WorkoutDataItem/WorkoutDataItem";
import { renderErrorMessage } from "../../helpers/form";
import AddSet from "../AddSet/AddSet";

const Dropset = forwardRef((props, ref) => {
  const {
    dropSetNumOfSets,
    onChangeNumberOfDropSet,
    showModalForDropSets,
    totalNumberOfWeight,
    totalNumberOfReps,
    toUse,
    errors,
    className,
  } = props;

  return (
    <div className="set-type__form--drop" ref={ref}>
      <div>
        <div className={`form-group-flex`}>
          <h4 className="title-4">Num of sets: </h4>
          {toUse !== "read" ? (
            <>
              <input
                type="number"
                name="numberOfDropSets"
                className={`kinetic-input-1-digit kinetic-input ${className}`}
                defaultValue={0}
                min={0}
                onChange={onChangeNumberOfDropSet}
              />
              <p className="error-message">
                {renderErrorMessage(errors, "numberOfDropSets")}
              </p>
            </>
          ) : (
            <div className="kinetic-input-1-digit kinetic-input">
              {dropSetNumOfSets.length}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: "3rem" }}>
          {dropSetNumOfSets.map((set, idx) => {
            return (
              <AddSet
                id={idx}
                key={idx}
                reps={set.reps}
                weight={set.weight}
                weightUnit={set.weightUnit}
                showModalHandler={showModalForDropSets}
              />
            );
          })}
        </div>
      </div>

      {toUse === "read" && (
        <div className="flex gap-sm">
          <WorkoutDataItem type="weight" data={totalNumberOfWeight} />
          <WorkoutDataItem type="reps" data={totalNumberOfReps} />
        </div>
      )}
    </div>
  );
});

export default Dropset;
