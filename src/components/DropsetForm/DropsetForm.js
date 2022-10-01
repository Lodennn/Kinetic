import { useRef } from "react";
import { forwardRef } from "react";
import WorkoutDataItem from "../../core-ui/WorkoutDataItem/WorkoutDataItem";
import { renderErrorMessage } from "../../helpers/form";
import AddSet from "../AddSet/AddSet";

const Dropset = forwardRef((props, ref) => {
  const {
    dropSetNumOfSets,
    sets,
    onChangeNumberOfDropSet,
    showModalForDropSets,
    totalNumberOfWeight,
    totalNumberOfReps,
    toUse,
    errors,
    className,
  } = props;

  // editing purpose
  const fixedDropsetNumberOfSets = useRef(sets.length);

  return (
    <div className="set-type__form--drop" ref={ref}>
      <div className={`form-group-flex`}>
        <h4 className="title-4">Num of sets: </h4>
        {toUse !== "read" ? (
          <>
            <input
              type="number"
              step="any"
              name="numberOfDropSets"
              className={`kinetic-input-1-digit kinetic-input-1-digit--white kinetic-input ${className}`}
              defaultValue={
                toUse === "edit" ? fixedDropsetNumberOfSets.current : 0
              }
              min={toUse === "edit" ? fixedDropsetNumberOfSets.current : 0}
              onChange={onChangeNumberOfDropSet}
            />
            <p className="error-message">
              {renderErrorMessage(errors, "numberOfDropSets")}
            </p>
          </>
        ) : (
          <div className="kinetic-input-1-digit kinetic-input">
            {sets.length}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: "3rem" }}>
        {sets.map((set, idx) => {
          return (
            <AddSet
              id={idx}
              key={idx}
              disabled={
                toUse === "edit" || toUse === "read"
                  ? false
                  : !(idx <= dropSetNumOfSets.filledSets)
              }
              reps={set.reps}
              weight={set.weight}
              weightUnit={set.weightUnit}
              showModalHandler={toUse !== "read" && showModalForDropSets}
            />
          );
        })}
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
