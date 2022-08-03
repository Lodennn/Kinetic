import React, { useEffect, useState } from "react";
import AddSet from "../AddSet/AddSet";

const Dropset = (props) => {
  const [totalRepsOfDropset, setTotalRepsOfDropset] = useState(0);

  const { dropSetNumOfSets } = props;

  useEffect(() => {
    setTotalRepsOfDropset(
      dropSetNumOfSets.reduce((acc, cur) => {
        return acc + +cur.reps;
      }, 0)
    );
  }, [dropSetNumOfSets]);

  return (
    <div className="set-type__form--drop">
      <div className={`form-group-flex`}>
        <h4 className="title-4">Num of sets: </h4>
        <input
          type="number"
          className="input-1-digit kinetic-input "
          defaultValue={0}
          onChange={props.onChangeNumberOfDropSets}
        />
      </div>
      <div style={{ display: "flex", gap: "3rem" }}>
        {props.dropSetNumOfSets.map((set, idx) => {
          return (
            <AddSet
              id={idx}
              key={idx}
              reps={set.reps}
              weight={set.weight}
              showModalHandler={props.showModalForDropSets.bind(null, idx)}
            />
          );
        })}
      </div>
      <div className="set-type__total-num-reps">
        Total of REPS: {totalRepsOfDropset}
      </div>
    </div>
  );
};

export default Dropset;
