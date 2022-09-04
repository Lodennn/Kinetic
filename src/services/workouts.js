import { resetDate } from "./dates";

export const filterWorkotusByDate = (workouts, date) => {
  return workouts.filter(
    (workout) => resetDate(workout.createdAt) === resetDate(date)
  );
};

export const getAvailableDatesInDay = (workouts, programId, dayId) => {
  const availableDates = [
    ...new Set(
      workouts
        .filter(
          (workout) =>
            workout.programId === programId && workout.dayId === dayId
        )
        .map((workout) => resetDate(workout.createdAt))
    ),
  ];

  availableDates.push(resetDate(new Date()));

  return availableDates.sort((a, b) => a - b);
};

export const calculateInfoOfSets = (sets, key) => {
  return sets.reduce((acc, cur) => {
    return acc + +cur[key];
  }, 0);
};
