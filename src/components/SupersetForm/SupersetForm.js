import React from "react";
import AddSet from "../AddSet/AddSet";

const Superset = (props) => {
  return (
    <div className="set-type__form--super">
      <div className="form-group">
        <input
          type="text"
          className="form-control kinetic-input kinetic-input--white"
          placeholder="Workout Name"
          onChange={props.onChangeNumberOfDropSets}
        />
      </div>
      <div className={`form-group-flex`}>
        <h4 className="title-4">Num of sets: </h4>
        <div>{props.numOfSets.length}</div>
      </div>
      <div style={{ display: "flex", gap: "3rem" }}>
        {props.superSetNumOfSets.map((set, idx) => {
          return (
            <AddSet
              id={idx}
              key={idx}
              reps={set.reps}
              weight={set.weight}
              showModalHandler={props.showModalForSuperSets.bind(null, idx)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Superset;
