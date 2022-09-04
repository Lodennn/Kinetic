import { Fragment } from "react";
import AddSet from "../AddSet/AddSet";
import TargetedMuscles from "../TargetedMuscles/TargetedMuscles";

import { ReactComponent as SupersetIcon } from "../../assets/icons/SUPERSET.svg";
import { ReactComponent as DropsetIcon } from "../../assets/icons/DROPSET.svg";
import { ReactComponent as NoteIcon } from "../../assets/icons/Notes.svg";

import SupersetForm from "../SupersetForm/SupersetForm";
import DropsetForm from "../DropsetForm/DropsetForm";

import "../AddWorkout/AddWorkout.scss";
import "./WorkoutDetails.scss";
import useReadData from "../../hooks/useReadData";
import ModalSecondary from "../../core-ui/ModalSecondary/ModalSecondary";
import WorkoutNote from "../WorkoutNote/WorkoutNote";
import WorkoutDataItem from "../../core-ui/WorkoutDataItem/WorkoutDataItem";

const WorkoutDetails = (props) => {
  const {
    id,
    sets,
    numberOfSets,
    superSet,
    dropSet,
    isSpecialWorkout,
    totalNumberOfWeight,
    totalNumberOfReps,
    hasNote,
  } = props.workoutDetails;

  const { data, showModal, showModalHandler, hideModalHandler } = useReadData();

  let activeSetsName = !!superSet.numberOfSets ? "Superset" : "Dropset";

  return (
    <Fragment>
      {showModal && (
        <ModalSecondary
          onHide={hideModalHandler}
          modalToUse={hasNote ? "read" : ""}
        >
          <WorkoutNote workoutDetails={data} />
        </ModalSecondary>
      )}
      <div className="p-md">
        <div className={"work-details"}>
          <button
            className="work-details__add-note svg--white svg--sm"
            onClick={showModalHandler.bind(null, props.workoutDetails)}
          >
            <NoteIcon />
          </button>
          <div className="form-group mb-xxg">
            <h3 className="title-3 kinetic-input">
              {props.workoutDetails.workoutName}
            </h3>
          </div>
          <div className="form-group  mb-xxg">
            <h4 className="title-4 text-uppercase mb-sm">Targeted Muscle: </h4>
            <TargetedMuscles muscles={[props.workoutDetails.category]} />
          </div>
          <div className="mb-xxg">
            <div className={`form-group-flex`}>
              <h4 className="title-4 text-uppercase">Num of sets: </h4>
              <span className="kinetic-input-1-digit kinetic-input">
                {numberOfSets}
              </span>
            </div>
            <div style={{ display: "flex", gap: "3rem" }}>
              {sets.map((set, idx) => {
                return (
                  <AddSet
                    key={idx}
                    numOfSets={numberOfSets}
                    sets={sets}
                    reps={set.reps}
                    weight={set.weight}
                    weightUnit={set.weightUnit}
                  />
                );
              })}
            </div>
            <div className="mt-xxg flex gap-sm">
              <WorkoutDataItem type="weight" data={totalNumberOfWeight} />
              <WorkoutDataItem type="reps" data={totalNumberOfReps} />
            </div>
          </div>
        </div>
      </div>
      <hr />
      {isSpecialWorkout && (
        <div
          className={`add-workout__actions ${
            activeSetsName ? "sets-animation-active" : null
          }`}
        >
          {/* SPECIAL SET TYPE */}
          <div className="set-type set-type--details" id={activeSetsName}>
            <header className="set-type__header">
              <div className="set-type__header-title">
                <h4 className="set-type__header-title--text">
                  {activeSetsName}
                </h4>
              </div>
              <div className="set-type__sets">
                <div
                  className={`set-type__sets-set ${
                    activeSetsName ? "active" : null
                  }`}
                >
                  {activeSetsName === "Superset" ? (
                    <SupersetIcon />
                  ) : (
                    <DropsetIcon />
                  )}
                </div>
              </div>
            </header>
            {/* SPECIAL SET FORM */}
            <section>
              <div className="set-type__form">
                {activeSetsName === "Superset" ? (
                  <SupersetForm
                    totalNumberOfWeight={superSet.totalNumberOfWeight}
                    totalNumberOfReps={superSet.totalNumberOfReps}
                    superSetWorkoutName={superSet.workoutName}
                    sets={superSet.sets}
                    toUse="read"
                  />
                ) : (
                  <DropsetForm
                    dropSetNumOfSets={dropSet.sets}
                    totalNumberOfWeight={dropSet.totalNumberOfWeight}
                    totalNumberOfReps={dropSet.totalNumberOfReps}
                    toUse="read"
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default WorkoutDetails;
