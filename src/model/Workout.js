export default class Workout {
  constructor(
    id,
    userId,
    dayId,
    programId,
    workoutName,
    category,
    numberOfSets,
    sets,
    totalNumberOfWeight,
    totalNumebrOfReps,
    progressState,
    isSpecialWorkout,
    superSet,
    dropSet,
    createdAt
  ) {
    this.id = id;
    this.userId = userId;
    this.dayId = dayId;
    this.programId = programId;
    this.workoutName = workoutName;
    this.category = category;
    this.numberOfSets = numberOfSets;
    this.sets = sets;
    this.totalNumberOfWeight = totalNumberOfWeight;
    this.totalNumebrOfReps = totalNumebrOfReps;
    this.progressState = progressState;
    this.isSpecialWorkout = isSpecialWorkout;
    this.superSet = superSet;
    this.dropSet = dropSet;
    this.createdAt = createdAt;
  }
}
