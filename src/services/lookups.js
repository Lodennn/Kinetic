export const targetedMuscleLookup = [
  "Chest",
  "Back",
  "Arms",
  "Shoulders",
  "Legs",
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