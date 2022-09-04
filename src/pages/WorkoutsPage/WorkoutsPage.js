import { Fragment, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddWorkout from "../../components/AddWorkout/AddWorkout";
import Workout from "../../components/Workout/Workout";
import FloatingCTA from "../../core-ui/FloatingCTA/FloatingCTA";
import Modal from "../../core-ui/Modal/Modal";
import PageIntro from "../../core-ui/PageIntro/PageIntro";
import useReadData from "../../hooks/useReadData";

import { ReactComponent as PlusIcon } from "../../assets/icons/PLUS.svg";

import { useParams } from "react-router-dom";

import WorkoutDetails from "../../components/WorkoutDetails/WorkoutDetails";
import WorkoutsDateSlider from "../../components/WorkoutsDateSlider/WorkoutsDateSlider";
import {
  filterWorkotusByDate,
  getAvailableDatesInDay,
} from "../../services/workouts";
import { getWorkoutsAction } from "../../store/workouts/workouts-slice";
import { resetDate } from "../../services/dates";

const WorkoutsPage = () => {
  const { programId, dayId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkoutsAction({ programId, dayId }));
  }, []);

  const { workouts } = useSelector((state) => state.workouts);

  const availableDates = getAvailableDatesInDay(workouts, programId, dayId);

  const initialState = { date: new Date() };

  const reducer = (state = initialState, action) => {
    if (action.type === "next") {
      const newActiveDate = availableDates[action.payload + 1];
      return { date: new Date(newActiveDate) };
    }
    if (action.type === "prev") {
      const newActiveDate = availableDates[action.payload - 1];
      return { date: new Date(newActiveDate) };
    }
    return initialState;
  };

  const [workoutFilteredDateR, dateDispatch] = useReducer(
    reducer,
    initialState
  );

  const filteredWorkouts = filterWorkotusByDate(
    workouts,
    workoutFilteredDateR.date
  );

  const { showModal, showModalHandler, hideModalHandler } = useReadData();
  const {
    data: workoutDetails,
    showModal: showWorkoutDetailsModal,
    showModalHandler: showWorkoutDetailsModalHandler,
    hideModalHandler: hideWorkoutDetailsModalHandler,
  } = useReadData(workouts);

  const getActiveDateIndex = () => {
    let activeDate = resetDate(workoutFilteredDateR.date);
    let activeDateIndex = availableDates.findIndex(
      (date) => date === activeDate
    );

    return activeDateIndex;
  };

  const getPrevDate = () => {
    let activeDateIndex = getActiveDateIndex();
    if (activeDateIndex > 0) {
      dateDispatch({ type: "prev", payload: activeDateIndex });
    }
  };

  const getNextDate = () => {
    let activeDateIndex = getActiveDateIndex();
    const max = availableDates.length - 1;
    if (activeDateIndex < max) {
      dateDispatch({ type: "next", payload: activeDateIndex });
    }
  };

  return (
    <div>
      <PageIntro subTitle="Create your" mainTitle="Workouts" />

      {showModal && (
        <Modal onHide={hideModalHandler}>
          <AddWorkout />
        </Modal>
      )}
      {showWorkoutDetailsModal && (
        <Modal onHide={hideWorkoutDetailsModalHandler} modalToUse="read">
          <WorkoutDetails workoutDetails={workoutDetails} />
        </Modal>
      )}
      <Fragment>
        <WorkoutsDateSlider
          date={workoutFilteredDateR.date}
          dates={availableDates}
          getPrevDate={getPrevDate}
          getNextDate={getNextDate}
        />
        <div className="section container">
          {filteredWorkouts.map((workout) => {
            return (
              <Workout
                key={workout.id}
                {...workout}
                onClick={showWorkoutDetailsModalHandler}
              />
            );
          })}
        </div>
      </Fragment>

      <FloatingCTA onClick={showModalHandler} icon={<PlusIcon />} />
    </div>
  );
};

export default WorkoutsPage;
