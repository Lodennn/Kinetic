import * as Yup from "yup";
import serviceError from "../services/errors";

export const workoutValidationSchema = (
  superValidCondition,
  dropValidCondition
) => {
  console.log("superValidCondition: ", superValidCondition);
  console.log("dropValidCondition: ", dropValidCondition);
  return Yup.object().shape({
    workoutName: Yup.string().required(serviceError.required),
    numberOfSets: Yup.number()
      .min(1, "The minimum amount is one")
      .required(serviceError.required),
    targetedMuscle: Yup.string().required(serviceError.required),
    specialSetFlag: Yup.string(),
    // superSetWorkoutName: Yup.string().when("specialSetFlag", {
    //   is: "superSetWorkoutNameFlag",
    //   then: Yup.string().required("Must enter super set name"),
    // }),
    superSetWorkoutName: Yup.string().when(superValidCondition.key, {
      is: superValidCondition.value,
      then: Yup.string().required("Must enter super set name"),
    }),
    // numberOfDropSets: Yup.number().when("specialSetFlag", {
    //   is: "numberOfDropSetsFlag",
    //   then: Yup.number()
    //     .positive()
    //     .min(1)
    //     .required("Must enter drop set number"),
    // }),
    numberOfDropSets: Yup.number().when(dropValidCondition.key, {
      is: dropValidCondition.value,
      then: Yup.number()
        .positive()
        .min(1)
        .required("Must enter drop set number"),
    }),
  });
};
