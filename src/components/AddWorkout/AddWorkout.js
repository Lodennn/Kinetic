import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Formik, Field, Form, useFormik } from "formik";

import PrimaryButton from "../../core-ui/Buttons/PrimaryButton/PrimaryButton";
import { setsType } from "../../data/setsType";
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

import WorkoutModel from "../../model/Workout";
import { addWorkoutSetsValidation } from "../../services/validations";
import { uncheckAll } from "../../helpers/form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkoutAction,
  workoutsActions,
} from "../../store/workouts/workouts-slice";
import { calculateInfoOfSets } from "../../services/workouts";

const AddWorkout = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.workouts);

  const defaultSetsValue = { sets: [], filledSets: 0 };

  const [workoutName, setWorkoutName] = useState("");
  const [targetedMuscle, setTargetedMuscle] = useState("");
  const [activeSetsName, setActiveSetsName] = useState("");

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

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      workoutName: "",
      numberOfSets: 0,
      numberOfDropSets: 0,
      targetedMuscle: "",
      mainSets: null,
      superSetWorkoutName: "",
    },
    onSubmit(values) {
      const submittedData = {};

      submittedData.userId = "090";
      submittedData.dayId = params.dayId;
      submittedData.programId = params.programId;
      submittedData.hasNote = false;
      submittedData.workoutName = values.workoutName;
      submittedData.category = values.targetedMuscle;
      submittedData.numberOfSets = values.numberOfSets;
      submittedData.sets = numOfSets.sets;
      //prettier-ignore
      submittedData.totalNumberOfWeight = calculateInfoOfSets(numOfSets.sets, 'weight');
      //prettier-ignore
      submittedData.totalNumberOfReps = calculateInfoOfSets(numOfSets.sets, 'reps');
      submittedData.progressState = 0;
      submittedData.createdAt = new Date();

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
        submittedData.isSpecialWorkout = false;
        submittedData.superSet = {};
        submittedData.dropSet = {};
      }

      const mainSetsValidator = addWorkoutSetsValidation(
        addWorkoutFormRef.current
      );

      if (
        numOfSets.sets.length === 0 ||
        (activeSetsName === "Superset" && superSetNumOfSets.sets.length === 0)
      ) {
        console.log("NO SUBMITTED");
      } else {
        console.log("submittedData: ", submittedData);
        dispatch(
          addWorkoutAction({
            collection: "workouts",
            postData: submittedData,
          })
        );
        // dispatch(workoutActions.setWorkouts(submittedData));
      }

      // FORM VALIDATION !!

      // alert("values: ", JSON.stringify(values));
    },
  });

  // MAIN
  const addTargetedMuscle = useCallback((muscle) => {
    setTargetedMuscle(muscle);
  }, []);

  // MAIN
  const onChangeNumberOfSets = useCallback((event) => {
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
    uncheckAll(addWorkoutFormRef.current);
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
  const toggleAnimationHandler = () => {
    setActiveSetsName("");
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

  const submitHandler = (e) => {
    // e.preventDefault();
    // if (
    //   numOfSets.sets.length === 0 ||
    //   (activeSetsName === "Superset" && superSetNumOfSets.sets.length === 0)
    // ) {
    //   console.log("NO SUBMITTED");
    // } else {
    //   console.log("Submit");
    // }
    // const mainSetsValidator = addWorkoutSetsValidation(
    //   addWorkoutFormRef.current
    // );
    // // FORM VALIDATION !!
  };

  return (
    <Fragment>
      {showModal && (
        <ModalSecondary
        // onHide={hideModalHandler}
        >
          <AddSpecialSetModal
            onChangeUserNumberOfWeight={onChangeUserNumberOfWeight}
            onChangeUserNumberOfReps={onChangeUserNumberOfReps}
            hideModalHandler={hideModalHandler}
            addSetsHandler={addSetsHandler}
            getWeightUnit={getWeightUnit}
            setCheckboxId={data.setCheckboxId}
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
                  className="form-control kinetic-input"
                  placeholder="Workout Name"
                  name="workoutName"
                  value={values.workoutName}
                  onChange={onChangeWorkoutName}
                />
              </div>
              <div className="form-group  mb-xxg">
                <h4 className="title-4 text-uppercase mb-sm">
                  Targeted Muscle:{" "}
                </h4>
                <TargetedMuscles
                  muscles={["Chest", "Back", "Triceps", "Biceps"]}
                  addTargetedMuscle={addTargetedMuscle}
                  value={values.targetedMuscle}
                  onChange={onChangeTargetedMuscle}
                />
              </div>
              <div className="mb-xxg">
                <div className={`form-group-flex`}>
                  <h4 className="title-4 text-uppercase">Num of sets: </h4>
                  <input
                    type="number"
                    name="numberOfSets"
                    className="kinetic-input-1-digit kinetic-input "
                    defaultValue={0}
                    onChange={onChangeNumberOfSets}
                  />
                </div>
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
                  >
                    {set.name}
                  </PrimaryButton>
                );
              })}
            </div>

            <div className="flex-cta-wrapper">
              <SecondaryButton
                onClick={() => console.log("CANCEL")}
                variant="danger"
              >
                Cancel
              </SecondaryButton>
              {!isLoading && (
                <SecondaryButton onClick={submitHandler} type="submit">
                  Ok
                </SecondaryButton>
              )}
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
                      numOfSets={numOfSets.sets.length}
                      sets={superSetNumOfSets.sets}
                      showModalForSuperSets={showModalForSuperSets}
                      onChangeWorkoutName={onChangeSupersetWorkoutName}
                    />
                  ) : (
                    <DropsetForm
                      onChangeNumberOfDropSet={onChangeNumberOfDropSet}
                      dropSetNumOfSets={dropSetNumOfSets.sets}
                      showModalForDropSets={showModalForDropSets}
                    />
                  )}
                </div>
                <div>
                  <hr />
                  <div className="flex-cta-wrapper justify-end mt-xs">
                    <SecondaryButton
                      onClick={() => console.log("CANCEL")}
                      variant="secondary"
                    >
                      Cancel
                    </SecondaryButton>
                    <SecondaryButton
                      onClick={submitHandler}
                      variant="secondary"
                    >
                      Ok
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
