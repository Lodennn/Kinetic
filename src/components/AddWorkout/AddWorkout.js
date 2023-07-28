import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

import PrimaryButton from "../../core-ui/Buttons/PrimaryButton/PrimaryButton";
import {
  addWorkoutFormInitialState,
  defaultSetsValue,
  setsType,
} from "../../services/lookups";
import AddSet from "../AddSet/AddSet";
import TargetedMuscles from "../TargetedMuscles/TargetedMuscles";
import ModalSecondary from "../../core-ui/ModalSecondary/ModalSecondary";

import { ReactComponent as SupersetIcon } from "../../assets/icons/SUPERSET.svg";
import { ReactComponent as DropsetIcon } from "../../assets/icons/DROPSET.svg";

import { BsChevronLeft } from "react-icons/bs";

import "./AddWorkout.scss";

import useReadData from "../../hooks/useReadData";
import SupersetForm from "../SupersetForm/SupersetForm";
import DropsetForm from "../DropsetForm/DropsetForm";
import AddSpecialSetModal from "../../core-ui/Modal/AddSpecialSetModal/AddSpecialSetModal";
import SecondaryButton from "../../core-ui/Buttons/SecondaryButton/SecondaryButton";

import {
  onSubmitCrudWorkoutForm,
  renderErrorClass,
  renderErrorMessage,
  uncheckAll,
} from "../../helpers/form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkoutAction,
  workoutsActions,
} from "../../store/workouts/workouts-slice";

import * as Yup from "yup";
import { targetedMuscleLookup } from "../../services/lookups";
import LoadingSpinner from "../../core-ui/LoadingSpinner/LoadingSpinner";
import useCrudWorkouts from "../../hooks/CRUDWorkouts";
import { workoutValidationSchema } from "../../services/validationSchema";
import SmartSearch from "../../core-ui/SmartSearch/SmartSearch";

const AddWorkout = (props) => {
  const params = useParams();

  const dispatch = useDispatch();

  const { isLoading, addWorkoutForm } = useSelector((state) => state.workouts);

  const { user } = useSelector((state) => state.auth);

  const [activeSetsName, setActiveSetsName] = useState("");

  const weightUnitRef = useRef("kg");

  const addWorkoutElementRef = useRef(null);
  const setTypeElementRef = useRef(null);

  const addWorkoutFormRef = useRef(null);
  const addWorkoutDropFormRef = useRef(null);

  // SECONDARY MODAL
  const { data, showModal, showModalHandler, hideModalHandler } = useReadData();

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
  } = useCrudWorkouts([], [], [], data, showModalHandler);

  useEffect(() => {
    let scrollTimeout;
    if (addWorkoutElementRef.current && setTypeElementRef.current) {
      scrollTimeout = setTimeout(() => {
        addWorkoutElementRef.current.scroll({
          left: 0,
          top: setTypeElementRef.current.offsetTop,
          behavior: "smooth",
        });
      }, 900);
    }
    return () => clearTimeout(scrollTimeout);
  }, [activeSetsName]);

  useEffect(() => {
    if (activeSetsName === "Superset") {
      setDropSetNumOfSets(defaultSetsValue);
      setSuperSetNumOfSets((prevState) => ({
        ...prevState,
        sets: Array(returnedSets.sets.length).fill({
          weight: "",
          reps: "",
          weightUnit: weightUnitRef.current,
        }),
      }));
    }
    if (activeSetsName === "Dropset") {
      setDropSetNumOfSets(defaultSetsValue);
      setSuperSetNumOfSets((prevState) => ({
        ...prevState,
        sets: Array(returnedSets.sets.length).fill({
          weight: "",
          reps: "",
          weightUnit: weightUnitRef.current,
        }),
      }));
    }
  }, [activeSetsName]);

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
    initialValues: addWorkoutFormInitialState,
    enableReinitialize: true,
    onSubmit: (values) => {
      const { submittedData, isValid } = onSubmitCrudWorkoutForm(
        addWorkoutFormRef,
        params,
        props,
        user,
        {
          values,
          numOfSets: returnedSets,
          activeSetsName,
          //x
          superSetNumOfSets: superSetNumOfSets,
          //x
          dropSetNumOfSets: dropSetNumOfSets,
        }
      );
      if (isValid) {
        dispatch(
          addWorkoutAction({
            collection: "workouts",
            postData: submittedData,
          })
        ).then((_) => props.onHide());
      } else {
      }
    },
    validationSchema: workoutValidationSchema(
      { key: "specialSetFlag", value: "superSetWorkoutNameFlag" },
      { key: "specialSetFlag", value: "numberOfDropSetsFlag" }
    ),
  });

  // MAIN
  const addTargetedMuscle = useCallback((muscle) => {
    // setTargetedMuscle(muscle);
  }, []);

  useEffect(() => {
    setReturnedSets((prevState) => ({
      ...prevState,
      filledSets: returnedSets.sets.filter((set) => !!set.weight).length,
    }));

    if (activeSetsName === "Superset") {
      setSuperSetNumOfSets((prevState) => ({
        ...prevState,
        filledSets: superSetNumOfSets.sets.filter((set) => !!set.weight).length,
      }));
    }
    if (activeSetsName === "Dropset") {
      setDropSetNumOfSets((prevState) => ({
        ...prevState,
        filledSets: dropSetNumOfSets.sets.filter((set) => !!set.weight).length,
      }));
    }
  }, [activeSetsName, showModal]);

  // MAIN
  const onAddSets = useCallback((event) => {
    const value = +event.target.value;
    if (value < 0) return;
    handleChange(event);
    setReturnedSets((prevState) => {
      const filledSetsNumber = prevState.sets.filter(
        (set) => !!set.weight
      ).length;

      if (!!!filledSetsNumber && value >= filledSetsNumber) {
        prevState.sets = Array(value).fill({
          weight: "",
          reps: "",
          weightUnit: weightUnitRef.current,
        });
      }

      if (!!filledSetsNumber && value >= filledSetsNumber) {
        prevState.sets = [
          ...prevState.sets.slice(0, filledSetsNumber),
          ...Array(value - filledSetsNumber).fill({
            weight: "",
            reps: "",
            weightUnit: weightUnitRef.current,
          }),
        ];
      }

      if (!!filledSetsNumber && value < filledSetsNumber) {
        prevState.sets.pop();
      }

      return {
        ...prevState,
        sets: prevState.sets,
      };
    });
    setSuperSetNumOfSets((prevState) => {
      const filledSetsNumber = prevState.sets.filter(
        (set) => !!set.weight
      ).length;

      if (!!!filledSetsNumber && value >= filledSetsNumber) {
        prevState.sets = Array(value).fill({
          weight: "",
          reps: "",
          weightUnit: weightUnitRef.current,
        });
      }

      if (!!filledSetsNumber && value >= filledSetsNumber) {
        prevState.sets = [
          ...prevState.sets.slice(0, filledSetsNumber),
          ...Array(value - filledSetsNumber).fill({
            weight: "",
            reps: "",
            weightUnit: weightUnitRef.current,
          }),
        ];
      }

      if (!!filledSetsNumber && value < filledSetsNumber) {
        prevState.sets.pop();
      }

      return {
        ...prevState,
        sets: prevState.sets,
      };
    });
  }, []);

  // MAIN
  const onChangeNumberOfDropSet = useCallback((event) => {
    handleChange(event);
    uncheckAll(addWorkoutDropFormRef.current);
    setDropSetNumOfSets((prevState) => ({
      ...prevState,
      sets: Array(+event.target.value).fill({
        weight: "",
        reps: "",
        weightUnit: weightUnitRef.current,
      }),
    }));
  }, []);

  // MAIN
  const getActiveSetsTypeHandler = (type) => {
    let setsName = type === "super" ? "Superset" : "Dropset";

    if (setsName === "Superset") {
      setSuperSetNumOfSets((prevState) => ({
        ...prevState,
        sets: Array(returnedSets.sets.length).fill({
          weight: "",
          reps: "",
          weightUnit: weightUnitRef.current,
        }),
      }));
    }
    setActiveSetsName(setsName);
  };

  // MAIN
  const toggleAnimationHandler = (setType) => {
    setFieldValue("specialSetFlag", "");
    // adding setTimeout to fix the bug of adding set type when check it
    setTimeout(() => setFieldValue("specialSetFlag", ""));

    setActiveSetsName("");

    //prettier-ignore
    addWorkoutFormRef.current.querySelectorAll(`input[name='specialSetFlag']`).forEach(input => input.checked = false);
    //prettier-ignore
    addWorkoutFormRef.current.querySelectorAll(`input[name='specialSetFlag']`).forEach(input => input.checked = false);
  };

  // FORM
  const onChangeWorkoutName = (event) => {
    handleChange(event);
  };

  const onChangeTargetedMuscle = (event) => {
    handleChange(event);
  };

  const onChangeMainSets = (event) => {
    handleChange(event);
  };

  const onChangeSupersetWorkoutName = (event) => {
    handleChange(event);
  };

  const onChangeCheckboxSetType = (event, setType) => {
    if (setType === "super") {
      setFieldValue("specialSetFlag", "superSetWorkoutNameFlag");
      setFieldValue("numberOfDropSets", 0);
      handleChange(event);
    } else {
      setFieldValue("specialSetFlag", "numberOfDropSetsFlag");
      setFieldValue("superSetWorkoutName", "");
      handleChange(event);
    }
  };

  return (
    <Fragment>
      {showModal && (
        <ModalSecondary>
          <AddSpecialSetModal
            onChangeUserNumberOfWeight={onChangeUserNumberOfWeight}
            onChangeUserNumberOfReps={onChangeUserNumberOfReps}
            hideModalHandler={hideModalHandler}
            addSetsHandler={addSetsHandler}
            getWeightUnit={getWeightUnit}
            setCheckboxId={data.setCheckboxId}
            onHide={hideModalHandler}
          />
        </ModalSecondary>
      )}
      <div className={"add-workout"} ref={addWorkoutElementRef}>
        <form
          className={"add-workout__form"}
          onSubmit={handleSubmit}
          ref={addWorkoutFormRef}
        >
          <div className="p-md">
            <h3 className="title-3 mb-sm">Add Workout</h3>
            <div className="add-workout__form--wrapper">
              <div className="form-group mb-xxg">
                <SmartSearch
                  input={{
                    type: "text",
                    className: `kinetic-input form-control title-5 ${renderErrorClass(
                      { errors, touched },
                      "workoutName"
                    )}`,
                    placeholder: "Workout Name",
                    name: "workoutName",
                    value: values.workoutName,
                    onChange: onChangeWorkoutName,
                    onBlur: handleBlur,
                  }}
                  setFieldValue={setFieldValue}
                  data={props.allDayWorkouts}
                />
                <p className="error-message">
                  {renderErrorMessage(errors, "workoutName")}
                </p>
              </div>
              <div className="form-group  mb-xxg">
                <h4 className="title-4 text-uppercase mb-sm">
                  Targeted Muscle:{" "}
                </h4>
                <TargetedMuscles
                  muscles={targetedMuscleLookup}
                  addTargetedMuscle={addTargetedMuscle}
                  value={values.targetedMuscle}
                  onChange={onChangeTargetedMuscle}
                  className={renderErrorClass(
                    { errors, touched },
                    "targetedMuscle"
                  )}
                />

                <p className="error-message">
                  {renderErrorMessage(errors, "targetedMuscle")}
                </p>
              </div>
              <div className="mb-xxg">
                <div className={`form-group-flex`}>
                  <h4 className="title-4 text-uppercase">Num of sets: </h4>
                  <input
                    type="number"
                    step="any"
                    name="numberOfSets"
                    className={`kinetic-input-1-digit kinetic-input ${renderErrorClass(
                      { errors, touched },
                      "numberOfSets"
                    )}`}
                    // defaultValue={0}
                    placeholder={0}
                    min={0}
                    onChange={onAddSets}
                  />
                </div>
                <p className="error-message">
                  {renderErrorMessage(errors, "numberOfSets")}
                </p>
                <div
                  style={{
                    display: "flex",
                    columnGap: "3rem",
                    flexWrap: "wrap",
                  }}
                >
                  {returnedSets.sets.map((set, idx) => {
                    return (
                      <AddSet
                        id={idx}
                        key={idx}
                        disabled={!(idx <= returnedSets.filledSets)}
                        reps={set.reps}
                        weight={set.weight}
                        weightUnit={weightUnitRef.current}
                        showModalHandler={showModalForMainSets}
                        onChange={onChangeMainSets}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div
            className={`add-workout__actions p-md ${
              activeSetsName ? "sets-animation-active" : null
            }`}
            ref={setTypeElementRef}
          >
            <div className="flex-cta-wrapper">
              {setsType.map((set) => {
                return (
                  <PrimaryButton
                    key={set.id}
                    setType={set.type}
                    getActiveSetsTypeHandler={getActiveSetsTypeHandler}
                    type="button"
                    disabled={isLoading}
                  >
                    <input
                      className={`addworkout-checkbox-hack addworkout-checkbox-hack--${set.type}`}
                      type="radio"
                      name={"specialSetFlag"}
                      id={set.formName}
                      onChange={(event) =>
                        onChangeCheckboxSetType(event, set.type)
                      }
                      value={set.formName}
                    />
                    {set.name}
                  </PrimaryButton>
                );
              })}
            </div>

            <div className="flex-cta-wrapper">
              <SecondaryButton
                onClick={props.onHide}
                type="button"
                variant="danger"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner size={"sm"} /> : "Cancel"}
              </SecondaryButton>
              <SecondaryButton type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size={"sm"} /> : "Ok"}
              </SecondaryButton>
            </div>

            {/* SPECIAL SET TYPE */}
            <div className="set-type" id={activeSetsName}>
              <header className="set-type__header">
                <div className="set-type__header-title">
                  <div onClick={toggleAnimationHandler}>
                    <BsChevronLeft className="fix-icon" />
                  </div>
                  <h4 className="set-type__header-title--text">
                    {activeSetsName}
                  </h4>
                </div>
                <div className="set-type__sets">
                  {setsType.map((set, idx) => (
                    <div
                      key={set + idx}
                      className={`set-type__sets-set ${
                        set.name === activeSetsName ? "active" : null
                      }`}
                      onClick={getActiveSetsTypeHandler.bind(null, set.type)}
                    >
                      <input
                        id={set.formName}
                        type="radio"
                        name={"specialSetFlag"}
                        className={`addworkout-checkbox-hack addworkout-checkbox-hack--${set.type}`}
                        onChange={(event) =>
                          onChangeCheckboxSetType(event, set.type)
                        }
                        value={set.formName}
                      />
                      {set.type === "super" ? (
                        <SupersetIcon />
                      ) : (
                        <DropsetIcon />
                      )}
                    </div>
                  ))}
                </div>
              </header>

              {/* SPECIAL SET FORM */}
              <section className="set-type--wrapper">
                <div className="set-type__form p-md">
                  {activeSetsName === "Superset" ? (
                    <SupersetForm
                      ref={addWorkoutSuperFormRef}
                      superSetNumOfSets={superSetNumOfSets}
                      numOfSets={returnedSets.sets.length}
                      sets={superSetNumOfSets.sets}
                      showModalForSuperSets={showModalForSuperSets}
                      onChangeWorkoutName={onChangeSupersetWorkoutName}
                      errors={errors}
                      className={renderErrorClass(
                        { errors, touched },
                        "superSetWorkoutName"
                      )}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                      allDayWorkouts={props.allDayWorkouts}
                    />
                  ) : (
                    <DropsetForm
                      ref={addWorkoutDropFormRef}
                      dropSetNumOfSets={dropSetNumOfSets}
                      onChangeNumberOfDropSet={onChangeNumberOfDropSet}
                      sets={dropSetNumOfSets.sets}
                      showModalForDropSets={showModalForDropSets}
                      errors={errors}
                      className={renderErrorClass(
                        { errors, touched },
                        "numberOfDropSets"
                      )}
                    />
                  )}
                  <div className="mt-xg">
                    <hr />
                    <div className="flex-cta-wrapper justify-end mt-xs">
                      <SecondaryButton
                        onClick={props.onHide}
                        variant="secondary"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoadingSpinner size={"sm"} /> : "Cancel"}
                      </SecondaryButton>
                      <SecondaryButton
                        type="submit"
                        variant="secondary"
                        disabled={isLoading}
                      >
                        {isLoading ? <LoadingSpinner size={"sm"} /> : "Ok"}
                      </SecondaryButton>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddWorkout;
