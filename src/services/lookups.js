export const targetedMuscleLookup = [
  "Chest",
  "Back",
  "Arms",
  "Shoulders",
  "Legs",
  "Cardio",
];

export const yesterday = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate() - 1
);

export const setsType = [
  {
    id: 1,
    name: "Superset",
    type: "super",
    formName: "superSetWorkoutNameFlag",
  },
  { id: 2, name: "Dropset", type: "drop", formName: "numberOfDropSetsFlag" },
];

export const defaultSetsValue = { sets: [], filledSets: 0 };

export const addWorkoutFormInitialState = {
  workoutName: "",
  numberOfSets: 0,
  targetedMuscle: "",
  superSetWorkoutNameFlag: false,
  superSetWorkoutName: "",
  numberOfDropSetsFlag: false,
  numberOfDropSets: "",
};

export const editWorkoutFormInitialState = (props) => ({
  workoutName: props.workoutDetails.workoutName,
  numberOfSets: props.workoutDetails.numberOfSets,
  targetedMuscle: props.workoutDetails.category,
  superSetWorkoutNameFlag: false,
  superSetWorkoutName: props.workoutDetails.superSet.workoutName || "",
  numberOfDropSetsFlag: false,
  numberOfDropSets: props.workoutDetails.dropSet.numberOfSets || "",
});
