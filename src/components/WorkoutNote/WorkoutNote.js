import React from "react";
import { useEffect } from "react";
import AddNote from "./AddNote/AddNote";
import ViewNote from "./ViewNote/ViewNote";

import "./WorkoutNote.scss";

const WorkoutNote = (props) => {
  return (
    <div className="add-note p-md">
      {props.workoutDetails.hasNote ? (
        <ViewNote workoutDetails={props.workoutDetails} onHide={props.onHide} />
      ) : (
        <AddNote workoutId={props.workoutDetails.id} onHide={props.onHide} />
      )}
    </div>
  );
};

export default WorkoutNote;
