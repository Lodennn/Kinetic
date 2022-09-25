import errors from "../services/errors";
import { addWorkoutSetsValidation } from "../services/validations";
import {
  calculateInfoOfSets,
  checkWorkoutProgressStatus,
  filterWorkoutByName,
} from "../services/workouts";

export const uncheckAll = (formEl) => {
  //prettier-ignore
  const allSetsCheckboxes = Array.from(formEl.querySelectorAll(`input[type='checkbox']`));

  allSetsCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.dataset.valid = false;
  });
};

export const renderErrorClass = (errorData, fieldKey) => {
  //prettier-ignore
  return `${errorData.errors[fieldKey] && errorData.touched[fieldKey] && "input-error"}`;
};

export const renderErrorMessage = (errors, fieldKey) => {
  //prettier-ignore
  return !!errors[fieldKey] ? errors[fieldKey] : errors.undefiend;
};

export const onSubmitCrudWorkoutForm = (
  formRef,
  params,
  props,
  user,
  formData
) => {
  const { isValid, validator } = addWorkoutSetsValidation(formRef.current);
  console.log("isValid: ", isValid);

  const submittedData = {};

  submittedData.userId = user.id;
  submittedData.dayId = params.dayId;
  submittedData.programId = params.programId;
  submittedData.hasNote = false;
  submittedData.workoutName = formData.values.workoutName;
  submittedData.category = formData.values.targetedMuscle;
  submittedData.numberOfSets = formData.values.numberOfSets;
  submittedData.sets = formData.numOfSets.sets;
  //prettier-ignore
  submittedData.totalNumberOfWeight = calculateInfoOfSets(formData.numOfSets.sets, "weight");
  //prettier-ignore
  submittedData.totalNumberOfReps = calculateInfoOfSets(formData.numOfSets.sets, "reps");
  submittedData.createdAt = new Date();
  // new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth(),
  //   new Date().getDate() - 1
  // );

  const typicalLastWorkout = filterWorkoutByName(
    props.lastWorkouts,
    formData.values.workoutName
  );
  const progressStatus = checkWorkoutProgressStatus(
    typicalLastWorkout,
    submittedData
  );

  submittedData.progressState = progressStatus;

  if (formData.activeSetsName === "Superset") {
    submittedData.isSpecialWorkout = true;
    submittedData.dropSet = {};
    submittedData.superSet = {
      workoutName: formData.values.superSetWorkoutName,
      numberOfSets: formData.superSetNumOfSets.sets.length,
      sets: formData.superSetNumOfSets.sets,
      //prettier-ignore
      totalNumberOfWeight: calculateInfoOfSets(formData.superSetNumOfSets.sets, 'weight'),
      //prettier-ignore
      totalNumberOfReps: calculateInfoOfSets(formData.superSetNumOfSets.sets, 'reps'),
    };
  } else if (formData.activeSetsName === "Dropset") {
    submittedData.isSpecialWorkout = true;
    submittedData.superSet = {};
    submittedData.dropSet = {
      numberOfSets: formData.dropSetNumOfSets.sets.length,
      sets: formData.dropSetNumOfSets.sets,
      //prettier-ignore
      totalNumberOfWeight: calculateInfoOfSets(formData.dropSetNumOfSets.sets, 'weight'),
      //prettier-ignore
      totalNumberOfReps: calculateInfoOfSets(formData.dropSetNumOfSets.sets, 'reps'),
    };
  } else {
    submittedData.isSpecialWorkout = "";
    submittedData.superSet = {};
    submittedData.dropSet = {};
  }

  return { submittedData, isValid };
};
