import { addWorkoutSetsValidation, isRequried } from "../services/validations";

export const addWorkoutValidateFn = (values) => {
  const errors = {};

  console.log(
    "values: ",
    values,
    values.numberOfDropSets,
    values.superSetWorkoutName
  );

  if (!isRequried(values.workoutName)) {
    errors.workoutName = "This field is required";
  }
  if (!isRequried(values.numberOfSets)) {
    errors.numberOfSets = "This field is required";
  }
  if (!isRequried(values.targetedMuscle)) {
    errors.targetedMuscle = "This field is required";
  }
  if (values.superSetWorkoutName && !isRequried(values.superSetWorkoutName)) {
    errors.superSetWorkoutName = "This field is required";
    delete errors.numberOfDropSets;
  }
  if (values.numberOfDropSets && !isRequried(values.numberOfDropSets)) {
    errors.numberOfDropSets = "This field is required";
    delete errors.superSetWorkoutName;
  }

  return errors;
};
