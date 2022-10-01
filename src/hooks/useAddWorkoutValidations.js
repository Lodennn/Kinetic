// import { useSelector } from "react-redux";
// import { addWorkoutSetsValidation, isRequried } from "../services/validations";

// const useAddWorkoutValidations = () => {
//   const { addWorkoutForm } = useSelector((state) => state.workouts);

//   const addWorkoutValidateFn = (values) => {
//     const errors = {};
//     if (!isRequried(values.workoutName)) {
//       errors.workoutName = "This field is required";
//     }
//     if (!isRequried(values.numberOfSets)) {
//       errors.numberOfSets = "This field is required";
//     }
//     if (!isRequried(values.numberOfDropSets)) {
//       errors.numberOfDropSets = "This field is required";
//     }
//     if (!isRequried(values.targetedMuscle)) {
//       errors.targetedMuscle = "This field is required";
//     }
//     if (!isRequried(values.superSetWorkoutName)) {
//       errors.superSetWorkoutName = "This field is required";
//     }

//     return errors;
//   };

//   const mainSetsValidator = addWorkoutSetsValidation(addWorkoutForm.form);

//   return { addWorkoutValidateFn };
// };

// export default useAddWorkoutValidations;
