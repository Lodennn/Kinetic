import { useEffect, useState } from "react";
import classes from "./TargetedMuscles.module.scss";

const TargetedMuscles = (props) => {
  const [activeMuscle, setActiveMuscle] = useState("");

  const { addTargetedMuscle } = props;

  useEffect(() => {
    addTargetedMuscle(activeMuscle);
  }, [activeMuscle, addTargetedMuscle]);

  return (
    <div className={classes["targeted-muscles"]}>
      {props.muscles.map((muscle, idx) => {
        let activeMuscleClass =
          muscle === activeMuscle
            ? classes["targeted-muscles__muscle--active"]
            : null;
        return (
          <div
            key={muscle + idx}
            className={`${classes["targeted-muscles__muscle"]} ${activeMuscleClass}`}
            onClick={() => setActiveMuscle(muscle)}
          >
            <span>{muscle}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TargetedMuscles;
