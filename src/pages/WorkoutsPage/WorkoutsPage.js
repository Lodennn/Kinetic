import AddWorkout from "../../components/AddWorkout/AddWorkout";
import Workout from "../../components/Workout/Workout";
import FloatingCTA from "../../core-ui/FloatingCTA/FloatingCTA";
import Modal from "../../core-ui/Modal/Modal";
import PageIntro from "../../core-ui/PageIntro/PageIntro";
import useReadData from "../../hooks/useReadData";

import { ReactComponent as PlusIcon } from "../../assets/icons/PLUS.svg";

import classes from "./Workouts.module.scss";

const WorkoutsPage = () => {
  const { showModal, showModalHandler, hideModalHandler } = useReadData();
  return (
    <div>
      <PageIntro subTitle="Create your" mainTitle="Workouts" />
      {showModal && (
        <Modal onHide={hideModalHandler}>
          <AddWorkout />
        </Modal>
      )}
      <div className="section container">
        <Workout workoutName="Shoulder Press" totalReps="43" sets="4" />
        <Workout workoutName="Shoulder Press" totalReps="43" sets="4" />
        <Workout workoutName="Shoulder Press" totalReps="43" sets="4" />
        <Workout workoutName="Shoulder Press" totalReps="43" sets="4" />
      </div>

      <FloatingCTA onClick={showModalHandler} icon={<PlusIcon />} />
    </div>
  );
};

export default WorkoutsPage;
