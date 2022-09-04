import React from "react";
import AddNote from "./AddNote/AddNote";
import ViewNote from "./ViewNote/ViewNote";

import "./WorkoutNote.scss";

const WorkoutNote = (props) => {
  return (
    <div className="add-note p-md">
      {props.workoutDetails.hasNote ? (
        <ViewNote />
      ) : (
        <AddNote workoutId={props.workoutDetails.id} />
      )}
    </div>
  );
};

export default WorkoutNote;
