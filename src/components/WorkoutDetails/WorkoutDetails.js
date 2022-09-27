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
import {
  addWorkoutFormInitialState,
  defaultSetsValue,
  editWorkoutFormInitialState,
  targetedMuscleLookup,
} from "../../services/lookups";
import { useState } from "react";
import AddSpecialSetModal from "../../core-ui/Modal/AddSpecialSetModal/AddSpecialSetModal";
import useCrudWorkouts from "../../hooks/CRUDWorkouts";
import Editworkout from "../EditWorkout/EditWorkout";
import { useFormik } from "formik";
import { workoutValidationSchema } from "../../services/validationSchema";
import { onSubmitCrudWorkoutForm, renderErrorClass, renderErrorMessage } from "../../helpers/form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWorkoutAction } from "../../store/workouts/workouts-slice";
import { useEffect } from "react";
import serviceError from "../../services/errors";
// import useAddWorkoutValidations from "../../hooks/useAddWorkoutValidations";
import * as Yup from "yup";
import { controlValue, decreaseSetsNumber, increaseSetsNumber } from "../../helpers/workouts";

const WorkoutDetails = (props) => {
  
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
  
    const params = useParams();

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
    onHide,
  } = props.workoutDetails;

  const {isEditing} = props;

  const workoutDetailsSupersetWorkoutName = props.workoutDetails.superSet.workoutName;
  const workoutDetailsDropsetNumberOfSets = props.workoutDetails.dropSet.numberOfSets;
  const hasSuperset = !!workoutDetailsSupersetWorkoutName;
  const hasDropset = !!workoutDetailsDropsetNumberOfSets;

  let activeSetsName = !!superSet.numberOfSets ? "Superset" : "Dropset";

  const editWorkoutFormRef = useRef(null);

  let Component = isEditing ? Editworkout : "div";

  
  const {
    data: editData,
    showModal: editShowModal,
    showModalHandler: editShowModalHandler,
    hideModalHandler: editHideModalHandler,
  } = useReadData();

  const {
    returnedSets,
    setReturnedSets,
    setDropSetNumOfSets,
    setSuperSetNumOfSets,
    dropSetNumOfSets,
    superSetNumOfSets,
    addWorkoutSuperFormRef,
    getWeightUnit,
    addSetsHandler,
    showModalForMainSets,
    showModalForDropSets,
    showModalForSuperSets,
    onChangeUserNumberOfReps,
    onChangeUserNumberOfWeight,
  } = useCrudWorkouts(sets, superSet.sets, dropSet.sets, editData, editShowModalHandler);

  // '';..;''
  const { data, showModal, showModalHandler, hideModalHandler } = useReadData(); // SECONDARY MODAL

  useEffect(() => {
    let addValidationOnType = "";
    if (hasSuperset) {
      addValidationOnType = "superSetWorkoutNameFlag";
    }
    if (hasDropset) {
      addValidationOnType = "numberOfDropSetsFlag";
    }

    setFieldValue(addValidationOnType, true);
  }, [hasSuperset, hasDropset]);

  useEffect(() => {
    console.log('useEffect');
    if (editWorkoutFormRef.current) {
      let numberOfExistingSets = 0;
      const checkboxes = Array.from(
        editWorkoutFormRef.current.querySelectorAll('input[type="checkbox"]')
      );

      if (hasSuperset) {
        numberOfExistingSets = numberOfSets * 2;
      }

      if (hasDropset) {
        numberOfExistingSets =
          numberOfSets + workoutDetailsDropsetNumberOfSets;
      }
      checkboxes
        .slice(0, numberOfExistingSets)
        .forEach((checkbox) => (checkbox.dataset.valid = true));
    }
  }, []);


  // editing functions
  const onEditSets = (event) => {
   const value = controlValue(event, numberOfSets);

    if (value > returnedSets.sets.length) {
      setReturnedSets(increaseSetsNumber);
      if (hasSuperset) {
        setSuperSetNumOfSets(increaseSetsNumber);
      }
    }
    if (value < returnedSets.sets.length) {
      setReturnedSets((prevState) => decreaseSetsNumber(prevState)(value, returnedSets, numberOfSets));
      if (hasSuperset) {
        setSuperSetNumOfSets((prevState) => decreaseSetsNumber(prevState)(value, superSetNumOfSets, numberOfSets));
      }
    }
  };


  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: editWorkoutFormInitialState(props),
    enableReinitialize: true,
    onSubmit: (values) => {
      const { submittedData, isValid } = onSubmitCrudWorkoutForm(
        editWorkoutFormRef,
        params,
        props,
        user,
        {
          values,
          numOfSets: returnedSets,
          activeSetsName: hasSuperset ? "Superset" : "Dropset",
          //x
          superSetNumOfSets: superSetNumOfSets,
          //x
          dropSetNumOfSets: dropSetNumOfSets,
        }
      );
      if (isValid) {
        console.log("EDIT submittedData: ", submittedData);
        // dispatch(
        //   addWorkoutAction({
        //     collection: "workouts",
        //     postData: submittedData,
        //   })
        // ).then((_) => onHide());
      } else {
        console.log("NOT SUBMITTED");
      }
    },
    validationSchema: Yup.object().shape({
      workoutName: Yup.string().required(serviceError.required),
      numberOfSets: Yup.number()
        .min(1, "The minimum amount is one")
        .required(serviceError.required),
      targetedMuscle: Yup.string().required(serviceError.required),
      superSetWorkoutNameFlag: Yup.boolean(),
      numberOfDropSetsFlag: Yup.boolean(),
      superSetWorkoutName: Yup.string().when("superSetWorkoutNameFlag", {
        is: true,
        then: Yup.string().required("Must enter super set name"),
      }),
      numberOfDropSets: Yup.number().when("numberOfDropSetsFlag", {
        is: true,
        then: Yup.number()
          .positive()
          .min(1)
          .required("Must enter drop set number"),
      }),
    }),
  });

  const onChangeNumberOfDropSet = (event) => {
    const value = controlValue(event, workoutDetailsDropsetNumberOfSets)

    if (value > workoutDetailsDropsetNumberOfSets) {
      setDropSetNumOfSets(increaseSetsNumber);
    }

    if (value < dropSetNumOfSets.sets.length) {
      setDropSetNumOfSets(prevState => decreaseSetsNumber(prevState)(value, dropSetNumOfSets, workoutDetailsDropsetNumberOfSets));
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
      <Component onSubmit={handleSubmit} ref={editWorkoutFormRef}>
        <div className="p-md">
          <div className={"work-details"}>
            <button
              className="work-details__add-note svg--white svg--sm"
              onClick={showModalHandler.bind(null, props.workoutDetails)}
            >
              <NoteIcon />
            </button>
            <div className="form-group mb-xxg">
              {isEditing ? (
                <div className="form-group mb-xxg">
                  <input
                    type="text"
                    className={`form-control kinetic-input `}
                    placeholder="Workout Name"
                    name="workoutName"
                    value={values.workoutName}
                    onChange={handleChange}
                  />
                  <p className="error-message">
                    {renderErrorMessage(errors, "workoutName")}
                  </p>
                </div>
              ) : (
                <h3 className="title-3 kinetic-input">
                  {props.workoutDetails.workoutName}
                </h3>
              )}
            </div>
            <div className="form-group  mb-xxg">
              <h4 className="title-4 text-uppercase mb-sm">
                Targeted Muscle:{" "}
              </h4>
              {isEditing ? (
                <TargetedMuscles
                  muscles={targetedMuscleLookup}
                  activeMuscle={props.workoutDetails.category}
                  // addTargetedMuscle={addTargetedMuscle}
                  value={values.targetedMuscle}
                  onChange={handleChange}
                  className={renderErrorClass(
                    { errors, touched },
                    "targetedMuscle"
                  )}
                />
              ) : (
                <TargetedMuscles muscles={[props.workoutDetails.category]} />
              )}
            </div>
            <div className="mb-xxg">
              <div className={`form-group-flex`}>
                <h4 className="title-4 text-uppercase">Num of sets: </h4>
                {isEditing ? (
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
                      showModalHandler={
                        isEditing ? showModalForMainSets : () => {}
                      }
                    />
                  );
                })}
              </div>
              {!isEditing && (
                <div className="mt-xxg flex gap-sm">
                  <WorkoutDataItem type="weight" data={totalNumberOfWeight} />
                  <WorkoutDataItem type="reps" data={totalNumberOfReps} />
                </div>
              )}
            </div>
          </div>
          {isEditing && <button type="submit">Edit</button>}
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
                      ref={addWorkoutSuperFormRef}
                      superSetNumOfSets={superSetNumOfSets}
                      totalNumberOfWeight={superSet.totalNumberOfWeight}
                      totalNumberOfReps={superSet.totalNumberOfReps}
                      superSetWorkoutName={values.superSetWorkoutName}
                      sets={superSetNumOfSets.sets}
                      showModalForSuperSets={showModalForSuperSets}
                      toUse={isEditing ? "edit" : "read"}
                      errors={errors}
                      onChangeWorkoutName={handleChange}
                    />
                  ) : (
                    <DropsetForm
                      dropSetNumOfSets={dropSetNumOfSets}
                      sets={isEditing ? dropSetNumOfSets.sets : dropSet.sets}
                      onChangeNumberOfDropSet={onChangeNumberOfDropSet}
                      totalNumberOfWeight={dropSet.totalNumberOfWeight}
                      totalNumberOfReps={dropSet.totalNumberOfReps}
                      showModalForDropSets={showModalForDropSets}
                      errors={errors}
                      toUse={isEditing ? "edit" : "read"}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
        )}
      </Component>
    </Fragment>
  );
};

export default WorkoutDetails;
