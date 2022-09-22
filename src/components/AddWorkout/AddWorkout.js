import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

import PrimaryButton from "../../core-ui/Buttons/PrimaryButton/PrimaryButton";
import { defaultSetsValue, setsType } from "../../services/lookups";
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

import { addWorkoutSetsValidation } from "../../services/validations";
import {
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
import {
  calculateInfoOfSets,
  checkWorkoutProgressStatus,
  filterWorkoutByName,
} from "../../services/workouts";
import { addWorkoutValidateFn } from "../../helpers/validate";
import serviceError from "../../services/errors";
// import useAddWorkoutValidations from "../../hooks/useAddWorkoutValidations";

import * as Yup from "yup";
import { targetedMuscleLookup } from "../../services/lookups";
import LoadingSpinner from "../../core-ui/LoadingSpinner/LoadingSpinner";
import useCrudWorkouts from "../../hooks/CRUDWorkouts";

const AddWorkout = (props) => {
  const params = useParams();

  const dispatch = useDispatch();

  const { isLoading, addWorkoutForm } = useSelector((state) => state.workouts);

  const { user } = useSelector((state) => state.auth);

  const [workoutName, setWorkoutName] = useState("");
  const [targetedMuscle, setTargetedMuscle] = useState("");
  const [activeSetsName, setActiveSetsName] = useState("");

  const [setTypeEvent, setSetTypeEvent] = useState(null);

  const [numOfSets, setNumOfSets] = useState(defaultSetsValue);
  const [superSetNumOfSets, setSuperSetNumOfSets] = useState(defaultSetsValue);
  const [dropSetNumOfSets, setDropSetNumOfSets] = useState(defaultSetsValue);

  const [userSetsType, setUserSetsType] = useState("");

  const weightUnitRef = useRef("kg");

  const userNumberOfWeight = useRef("");
  const userNumberOfReps = useRef("");

  const addWorkoutElementRef = useRef(null);
  const setTypeElementRef = useRef(null);

  const addWorkoutFormRef = useRef(null);
  const addWorkoutSuperFormRef = useRef(null);
  const addWorkoutDropFormRef = useRef(null);

  // SECONDARY MODAL
  const { data, showModal, showModalHandler, hideModalHandler } = useReadData();

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
        sets: Array(numOfSets.sets.length).fill({
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
        sets: Array(numOfSets.sets.length).fill({
          weight: "",
          reps: "",
          weightUnit: weightUnitRef.current,
        }),
      }));
    }
  }, [activeSetsName, numOfSets]);

  const addWorkoutFormInitialState = {
    workoutName: "",
    numberOfSets: 0,
    targetedMuscle: "",
    superSetWorkoutNameFlag: false,
    superSetWorkoutName: "",
    numberOfDropSetsFlag: false,
    numberOfDropSets: "",
  };

  const validationSchema = Yup.object().shape({
    workoutName: Yup.string().required(serviceError.required),
    numberOfSets: Yup.number()
      .min(1, "The minimum amount is one")
      .required(serviceError.required),
    targetedMuscle: Yup.string().required(serviceError.required),
    specialSetFlag: Yup.string(),
    superSetWorkoutName: Yup.string().when("specialSetFlag", {
      is: "superSetWorkoutNameFlag",
      then: Yup.string().required("Must enter super set name"),
    }),
    numberOfDropSets: Yup.number().when("specialSetFlag", {
      is: "numberOfDropSetsFlag",
      then: Yup.number()
        .positive()
        .min(1)
        .required("Must enter drop set number"),
    }),
  });

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
      const { isValid, validator } = addWorkoutSetsValidation(
        addWorkoutFormRef.current
      );
      if (!isValid) {
        console.log("NOT SUBMITTED");
        return;
      }
      console.log("Submitted: ", values);
      const submittedData = {};

      submittedData.userId = user.id;
      submittedData.dayId = params.dayId;
      submittedData.programId = params.programId;
      submittedData.hasNote = false;
      submittedData.workoutName = values.workoutName;
      submittedData.category = values.targetedMuscle;
      submittedData.numberOfSets = values.numberOfSets;
      submittedData.sets = numOfSets.sets;
      //prettier-ignore
      submittedData.totalNumberOfWeight = calculateInfoOfSets(numOfSets.sets, "weight");
      //prettier-ignore
      submittedData.totalNumberOfReps = calculateInfoOfSets(numOfSets.sets, "reps");
      submittedData.createdAt = new Date();
      // new Date(
      //   new Date().getFullYear(),
      //   new Date().getMonth(),
      //   new Date().getDate() - 1
      // );

      const typicalLastWorkout = filterWorkoutByName(
        props.lastWorkouts,
        values.workoutName
      );
      const progressStatus = checkWorkoutProgressStatus(
        typicalLastWorkout,
        submittedData
      );

      submittedData.progressState = progressStatus;

      if (activeSetsName === "Superset") {
        submittedData.isSpecialWorkout = true;
        submittedData.dropSet = {};
        submittedData.superSet = {
          workoutName: values.superSetWorkoutName,
          numberOfSets: superSetNumOfSets.sets.length,
          sets: superSetNumOfSets.sets,
          //prettier-ignore
          totalNumberOfWeight: calculateInfoOfSets(superSetNumOfSets.sets, 'weight'),
          //prettier-ignore
          totalNumberOfReps: calculateInfoOfSets(superSetNumOfSets.sets, 'reps'),
        };
      } else if (activeSetsName === "Dropset") {
        submittedData.isSpecialWorkout = true;
        submittedData.superSet = {};
        submittedData.dropSet = {
          numberOfSets: dropSetNumOfSets.sets.length,
          sets: dropSetNumOfSets.sets,
          //prettier-ignore
          totalNumberOfWeight: calculateInfoOfSets(dropSetNumOfSets.sets, 'weight'),
          //prettier-ignore
          totalNumberOfReps: calculateInfoOfSets(dropSetNumOfSets.sets, 'reps'),
        };
      } else {
        submittedData.isSpecialWorkout = "";
        submittedData.superSet = {};
        submittedData.dropSet = {};
      }

      console.log("'''''''''''''''''''''''''''''''''''''''''''''''''''");
      console.log("submittedData: ", submittedData);

      dispatch(
        addWorkoutAction({
          collection: "workouts",
          postData: submittedData,
        })
      ).then((_) => props.onHide());
    },
    // validate: addWorkoutValidateFn,
    validationSchema,
  });

  // MAIN
  const addTargetedMuscle = useCallback((muscle) => {
    setTargetedMuscle(muscle);
  }, []);

  // MAIN
  const onChangeNumberOfSets = useCallback((event) => {
    if (+event.target.value < 0) return;
    uncheckAll(addWorkoutFormRef.current);
    handleChange(event);
    setNumOfSets((prevState) => ({
      ...prevState,
      sets: Array(+event.target.value).fill({
        weight: "",
        reps: "",
        weightUnit: weightUnitRef.current,
      }),
    }));
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
        sets: Array(numOfSets.sets.length).fill({
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

  const resetUserSecondaryInputs = () => {
    userNumberOfReps.current = 0;
    userNumberOfWeight.current = 0;
  };

  // MAIN
  const showModalForMainSets = (data) => {
    resetUserSecondaryInputs();
    setUserSetsType("main");
    showModalHandler(data);
  };

  // SECONDARY MODAL
  const onChangeUserNumberOfReps = (event) => {
    userNumberOfReps.current = event.target.value;
  };

  // SECONDARY MODAL
  const onChangeUserNumberOfWeight = (event) => {
    userNumberOfWeight.current = event.target.value;
  };

  // SECONDARY MODAL
  const addSetsHandler = () => {
    if (userSetsType === "main") {
      setNumOfSets((prevState) => {
        prevState.sets[data.setId] = {
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
      setSuperSetNumOfSets((prevState) => {
        prevState.sets[data.setId] = {
          weight: userNumberOfWeight.current,
          reps: userNumberOfReps.current,
          weightUnit: weightUnitRef.current,
        };
        return {
          sets: [...prevState.sets],
          filledSets: prevState.filledSets + 1,
        };
      });
      setDropSetNumOfSets(defaultSetsValue);
    } else if (userSetsType === "drop") {
      setDropSetNumOfSets((prevState) => {
        prevState.sets[data.setId] = {
          weight: userNumberOfWeight.current,
          reps: userNumberOfReps.current,
          weightUnit: weightUnitRef.current,
        };
        return {
          sets: [...prevState.sets],
          filledSets: prevState.filledSets + 1,
        };
      });
      setSuperSetNumOfSets(defaultSetsValue);
    }
  };

  // SET TYPE PART
  const showModalForSuperSets = (data) => {
    resetUserSecondaryInputs();
    setUserSetsType("super");
    showModalHandler(data);
  };

  // SET TYPE PART
  const showModalForDropSets = (data) => {
    resetUserSecondaryInputs();
    setUserSetsType("drop");
    showModalHandler(data);
  };

  const getWeightUnit = useCallback((unit) => {
    weightUnitRef.current = unit;
  }, []);

  // FORM
  const onChangeWorkoutName = (event) => {
    handleChange(event);
    setWorkoutName(event.target.value);
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
    setSetTypeEvent(event);

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
                <input
                  type="text"
                  className={`form-control kinetic-input ${renderErrorClass(
                    { errors, touched },
                    "workoutName"
                  )}`}
                  placeholder="Workout Name"
                  name="workoutName"
                  value={values.workoutName}
                  onChange={onChangeWorkoutName}
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
                    name="numberOfSets"
                    className={`kinetic-input-1-digit kinetic-input ${renderErrorClass(
                      { errors, touched },
                      "numberOfSets"
                    )}`}
                    defaultValue={0}
                    min={0}
                    onChange={onChangeNumberOfSets}
                  />
                </div>
                <p className="error-message">
                  {renderErrorMessage(errors, "numberOfSets")}
                </p>
                <div style={{ display: "flex", gap: "3rem" }}>
                  {numOfSets.sets.map((set, idx) => {
                    return (
                      <AddSet
                        id={idx}
                        key={idx}
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
                      numOfSets={numOfSets.sets.length}
                      sets={superSetNumOfSets.sets}
                      showModalForSuperSets={showModalForSuperSets}
                      onChangeWorkoutName={onChangeSupersetWorkoutName}
                      errors={errors}
                      className={renderErrorClass(
                        { errors, touched },
                        "superSetWorkoutName"
                      )}
                    />
                  ) : (
                    <DropsetForm
                      ref={addWorkoutDropFormRef}
                      onChangeNumberOfDropSet={onChangeNumberOfDropSet}
                      dropSetNumOfSets={dropSetNumOfSets.sets}
                      showModalForDropSets={showModalForDropSets}
                      errors={errors}
                      className={renderErrorClass(
                        { errors, touched },
                        "numberOfDropSets"
                      )}
                    />
                  )}
                </div>
                <div>
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
              </section>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddWorkout;
