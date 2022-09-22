import { Fragment, useCallback, useRef } from "react";
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
import { defaultSetsValue, targetedMuscleLookup } from "../../services/lookups";
import { useState } from "react";
import AddSpecialSetModal from "../../core-ui/Modal/AddSpecialSetModal/AddSpecialSetModal";
import useCrudWorkouts from "../../hooks/CRUDWorkouts";

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

  const { data, showModal, showModalHandler, hideModalHandler } = useReadData(); // SECONDARY MODAL

  let activeSetsName = !!superSet.numberOfSets ? "Superset" : "Dropset";

  // editing variables
  // const [returnedSets, setReturnedSets] = useState({ sets, filledSets: 0 });
  // const [userSetsType, setUserSetsType] = useState("");
  // const userNumberOfWeight = useRef("");
  // const userNumberOfReps = useRef("");
  // const weightUnitRef = useRef("kg");
  const {
    data: editData,
    showModal: editShowModal,
    showModalHandler: editShowModalHandler,
    hideModalHandler: editHideModalHandler,
  } = useReadData();

  const {
    returnedSets,
    setReturnedSets,
    userSetsType,
    userNumberOfWeight,
    userNumberOfReps,
    weightUnitRef,
    showModalForMainSets,
    getWeightUnit,
    onChangeUserNumberOfReps,
    onChangeUserNumberOfWeight,
  } = useCrudWorkouts(sets, editShowModalHandler);

  // editing functions
  const onEditSets = (event) => {
    const value = +event.target.value;
    if (value < numberOfSets) return;

    if (value > returnedSets.sets.length) {
      setReturnedSets((prevState) => ({
        ...prevState,
        sets: [...prevState.sets, defaultSetsValue],
      }));
    }
    if (value < returnedSets.sets.length) {
      setReturnedSets((prevState) => {
        let resetPrevState = [...returnedSets.sets.slice(0, numberOfSets)];

        let newState = resetPrevState.concat(
          Array(Math.abs(value - numberOfSets)).fill(defaultSetsValue)
        );

        return { ...prevState, sets: newState };
      });
    }
  };
  // const resetUserSecondaryInputs = () => {
  //   userNumberOfReps.current = 0;
  //   userNumberOfWeight.current = 0;
  // };
  // MAIN
  // const showModalForMainSets = (data) => {
  //   resetUserSecondaryInputs();
  //   setUserSetsType("main");
  //   editShowModalHandler(data);
  // };

  // const getWeightUnit = useCallback((unit) => {
  //   weightUnitRef.current = unit;
  // }, []);

  // SECONDARY MODAL
  // const onChangeUserNumberOfReps = (event) => {
  //   userNumberOfReps.current = event.target.value;
  // };

  // SECONDARY MODAL
  // const onChangeUserNumberOfWeight = (event) => {
  //   userNumberOfWeight.current = event.target.value;
  // };

  console.log("editData: ", returnedSets, editData);

  // SECONDARY MODAL
  const addSetsHandler = () => {
    if (userSetsType === "main") {
      setReturnedSets((prevState) => {
        prevState.sets[editData.setId] = {
          weight: userNumberOfWeight.current,
          reps: userNumberOfReps.current,
          weightUnit: weightUnitRef.current,
        };
        return {
          sets: [...prevState.sets],
          filledSets: prevState.filledSets + 1,
        };
      });
    } else if (userSetsType === "super") {
      // setSuperSetNumOfSets((prevState) => {
      //   prevState.sets[editData.setId] = {
      //     weight: userNumberOfWeight.current,
      //     reps: userNumberOfReps.current,
      //     weightUnit: weightUnitRef.current,
      //   };
      //   return {
      //     sets: [...prevState.sets],
      //     filledSets: prevState.filledSets + 1,
      //   };
      // });
      // setDropSetNumOfSets(defaultSetsValue);
    } else if (userSetsType === "drop") {
      // setDropSetNumOfSets((prevState) => {
      //   prevState.sets[editData.setId] = {
      //     weight: userNumberOfWeight.current,
      //     reps: userNumberOfReps.current,
      //     weightUnit: weightUnitRef.current,
      //   };
      //   return {
      //     sets: [...prevState.sets],
      //     filledSets: prevState.filledSets + 1,
      //   };
      // });
      // setSuperSetNumOfSets(defaultSetsValue);
    }
  };

  return (
    <Fragment>
      {showModal && (
        <ModalSecondary
          onHide={hideModalHandler}
          modalToUse={hasNote ? "read" : ""}
        >
          <WorkoutNote workoutDetails={data} onHide={hideModalHandler} />
        </ModalSecondary>
      )}
      {editShowModal && (
        <ModalSecondary>
          <AddSpecialSetModal
            onChangeUserNumberOfWeight={onChangeUserNumberOfWeight}
            onChangeUserNumberOfReps={onChangeUserNumberOfReps}
            hideModalHandler={editHideModalHandler}
            addSetsHandler={addSetsHandler}
            getWeightUnit={getWeightUnit}
            setCheckboxId={editData.setCheckboxId}
            onHide={editHideModalHandler}
          />
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
            {props.isEditing ? (
              <div className="form-group mb-xxg">
                <input
                  type="text"
                  className={`form-control kinetic-input `}
                  placeholder="Workout Name"
                  name="workoutName"
                  value={props.workoutDetails.workoutName}
                  // onChange={onChangeWorkoutName}
                />
                <p className="error-message">
                  {/* {renderErrorMessage(errors, "workoutName")} */}
                </p>
              </div>
            ) : (
              <h3 className="title-3 kinetic-input">
                {props.workoutDetails.workoutName}
              </h3>
            )}
          </div>
          <div className="form-group  mb-xxg">
            <h4 className="title-4 text-uppercase mb-sm">Targeted Muscle: </h4>
            {props.isEditing ? (
              <TargetedMuscles
                muscles={targetedMuscleLookup}
                activeMuscle={props.workoutDetails.category}
                // addTargetedMuscle={addTargetedMuscle}
                // value={values.targetedMuscle}
                // onChange={onChangeTargetedMuscle}
                // className={renderErrorClass(
                //   { errors, touched },
                //   "targetedMuscle"
                // )}
              />
            ) : (
              <TargetedMuscles muscles={[props.workoutDetails.category]} />
            )}
          </div>
          <div className="mb-xxg">
            <div className={`form-group-flex`}>
              <h4 className="title-4 text-uppercase">Num of sets: </h4>
              {props.isEditing ? (
                <>
                  <div className={`form-group-flex`}>
                    <input
                      type="number"
                      name="numberOfSets"
                      className={`kinetic-input-1-digit kinetic-input`}
                      defaultValue={numberOfSets}
                      min={numberOfSets}
                      // onChange={onChangeNumberOfSets}
                      onChange={onEditSets}
                    />
                  </div>
                  <p className="error-message">
                    {/* {renderErrorMessage(errors, "numberOfSets")} */}
                  </p>
                </>
              ) : (
                <span className="kinetic-input-1-digit kinetic-input">
                  {numberOfSets}
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "3rem" }}>
              {returnedSets.sets.map((set, idx) => {
                return (
                  <AddSet
                    id={idx}
                    key={idx}
                    numOfSets={numberOfSets}
                    sets={returnedSets.sets}
                    reps={set.reps}
                    weight={set.weight}
                    weightUnit={set.weightUnit}
                    showModalHandler={showModalForMainSets}
                  />
                );
              })}
            </div>
            {!props.isEditing && (
              <div className="mt-xxg flex gap-sm">
                <WorkoutDataItem type="weight" data={totalNumberOfWeight} />
                <WorkoutDataItem type="reps" data={totalNumberOfReps} />
              </div>
            )}
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
                    toUse={props.isEditing ? "edit" : "read"}
                  />
                ) : (
                  <DropsetForm
                    dropSetNumOfSets={dropSet.sets}
                    totalNumberOfWeight={dropSet.totalNumberOfWeight}
                    totalNumberOfReps={dropSet.totalNumberOfReps}
                    toUse={props.isEditing ? "edit" : "read"}
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
