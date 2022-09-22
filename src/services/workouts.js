import { resetDate } from "./dates";

export const filterWorkotusByDate = (workouts, date) => {
  return workouts.filter(
    (workout) => resetDate(workout.createdAt) === resetDate(date)
  );
};

export const getAvailableDatesInDay = (workouts, programId, dayId) => {
  const availableDates = workouts
    .filter(
      (workout) => workout.programId === programId && workout.dayId === dayId
    )
    .map((workout) => resetDate(workout.createdAt));

  availableDates.push(resetDate(new Date()));

  return [...new Set(availableDates.sort((a, b) => a - b))];
};

export const calculateInfoOfSets = (sets, key) => {
  return sets.reduce((acc, cur) => {
    return acc + +cur[key];
  }, 0);
};

export const checkWorkoutProgressStatus = (oldWorkout, newWorkout) => {
  if (!oldWorkout) return -1;

  let progressStatus = -1;

  let isOldWorkoutHasDropset = !!oldWorkout.dropSet?.numberOfSets;
  let isOldWorkoutHasSuperset = !!oldWorkout.superSet?.numberOfSets;

  let isNewWorkoutHasDropset = !!newWorkout.dropSet?.numberOfSets;
  let isNewWorkoutHasSuperset = !!newWorkout.superSet?.numberOfSets;

  let oldWorkoutSpecialVolume = 0;
  let newWorkoutSpecialVolume = 0;

  if (isOldWorkoutHasDropset) {
    //prettier-ignore
    oldWorkoutSpecialVolume = calculateTheTotalVolumeOfWorkout(oldWorkout.dropSet.sets);
  }

  if (isOldWorkoutHasSuperset) {
    //prettier-ignore
    oldWorkoutSpecialVolume = calculateTheTotalVolumeOfWorkout(oldWorkout.superSet.sets);
  }

  if (isNewWorkoutHasDropset) {
    //prettier-ignore
    newWorkoutSpecialVolume = calculateTheTotalVolumeOfWorkout(newWorkout.dropSet.sets);
  }

  if (isNewWorkoutHasSuperset) {
    //prettier-ignore
    newWorkoutSpecialVolume = calculateTheTotalVolumeOfWorkout(newWorkout.superSet.sets);
  }

  //prettier-ignore
  const oldWorkoutTotalVolume = calculateTheTotalVolumeOfWorkout(oldWorkout.sets) + oldWorkoutSpecialVolume;
  //prettier-ignore
  const newWorkoutTotalVolume = calculateTheTotalVolumeOfWorkout(newWorkout.sets) + newWorkoutSpecialVolume;

  if (oldWorkoutTotalVolume === newWorkoutTotalVolume) {
    progressStatus = 0;
  } else if (oldWorkoutTotalVolume < newWorkoutTotalVolume) {
    progressStatus = 1;
  } else if (oldWorkoutTotalVolume > newWorkoutTotalVolume) {
    progressStatus = 2;
  }

  return progressStatus;
};

export const getWorkoutByDate = (workouts, filterByThisDate) => {
  return workouts.filter(
    (workout) =>
      resetDate(new Date(workout.createdAt)) ===
      resetDate(new Date(filterByThisDate))
  );
};

export const filterWorkoutByName = (workouts, workoutName) => {
  return workouts.filter((workout) => workout.workoutName === workoutName)[0];
};

const calculateTheTotalVolumeOfWorkout = (workoutSets) =>
  workoutSets.reduce((acc, cur) => acc + cur.weight * cur.reps, 0);
