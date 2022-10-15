import { Fragment, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import AddWorkout from "../../components/AddWorkout/AddWorkout";
import Workout from "../../components/Workout/Workout";
import FloatingCTA from "../../core-ui/FloatingCTA/FloatingCTA";
import Modal from "../../core-ui/Modal/Modal";
import PageIntro from "../../core-ui/PageIntro/PageIntro";
import useReadData from "../../hooks/useReadData";

import { ReactComponent as PlusIcon } from "../../assets/icons/PLUS.svg";
import emptyWorkoutsImage from '../../assets/add-workout-arrow3.jpeg';

import WorkoutDetails from "../../components/WorkoutDetails/WorkoutDetails";
import WorkoutsDateSlider from "../../components/WorkoutsDateSlider/WorkoutsDateSlider";
import {
  filterWorkotusByDate,
  getAvailableDatesInDay,
  getWorkoutByDate,
} from "../../services/workouts";
import { getWorkoutsAction } from "../../store/workouts/workouts-slice";
import { resetDate } from "../../services/dates";
import LoadingSpinner from "../../core-ui/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import Navigation from "../../components/Layouts/Navigation/Navigation";

const WorkoutsPage = () => {
  const { programId, dayId } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getWorkoutsAction({ programId, dayId, userId: user.id }));
  }, []);

  const { workouts, isLoading } = useSelector((state) => state.workouts);

  const availableDates = getAvailableDatesInDay(workouts, programId, dayId);

  const lastWorkoutDate = availableDates.at(-2);

  const lastWorkouts = getWorkoutByDate(workouts, lastWorkoutDate);

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

  const { showModal, showModalHandler, hideModalHandler } =
    useReadData(workouts);
  const {
    data: workoutDetails,
    showModal: showWorkoutDetailsModal,
    showModalHandler: showWorkoutDetailsModalHandler,
    hideModalHandler: hideWorkoutDetailsModalHandler,
  } = useReadData(workouts);

  const {
    data: editWorkoutDetails,
    showModal: showEditWorkoutModal,
    showModalHandler: showEditWorkoutModalHandler,
    hideModalHandler: hideEditWorkoutModalHandler,
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
    <>
      <Navigation />
      <div className="page-wrapper">
        <PageIntro subTitle="Create your" mainTitle="Workouts" />

        {showModal && (
          <Modal onHide={hideModalHandler}>
            <AddWorkout
              allDayWorkouts={workouts}
              lastWorkouts={lastWorkouts}
              onHide={hideModalHandler}
            />
          </Modal>
        )}

        {showWorkoutDetailsModal && (
          <Modal onHide={hideWorkoutDetailsModalHandler} modalToUse="read">
            <WorkoutDetails workoutDetails={workoutDetails} />
          </Modal>
        )}

        {showEditWorkoutModal && (
          <Modal onHide={hideEditWorkoutModalHandler} modalToUse="read">
            <WorkoutDetails
              allDayWorkouts={workouts}
              workoutDetails={editWorkoutDetails}
              lastWorkouts={lastWorkouts}
              isEditing={true}
              onHide={hideEditWorkoutModalHandler}
            />
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
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
            filteredWorkouts.length > 0 &&
              filteredWorkouts.map((workout) => {
                return (
                  <Workout
                    key={workout.id}
                    {...workout}
                    onClick={showWorkoutDetailsModalHandler}
                    onEdit={showEditWorkoutModalHandler}
                  />
                );
              })}
              {/* {filteredWorkouts.length <= 0 && <div><img src={emptyWorkoutsImage} alt='img' /></div>} */}
          </div>
        </Fragment>

        {resetDate(workoutFilteredDateR.date) === resetDate(new Date()) && (
          <FloatingCTA onClick={showModalHandler} icon={<PlusIcon />} />
        )}
      </div>
    </>
  );
};

export default WorkoutsPage;
