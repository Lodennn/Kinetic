import { useEffect, useState } from "react";
import classes from "./TargetedMuscles.module.scss";
import targetedMuscleClasses from "./TargetedMuscle/TargetedMuscle.module.scss";
import TargetedMuscle from "./TargetedMuscle/TargetedMuscle";

const TargetedMuscles = (props) => {
  const [activeMuscle, setActiveMuscle] = useState("");

  const { addTargetedMuscle } = props;

  useEffect(() => {
    if (addTargetedMuscle) {
      addTargetedMuscle(activeMuscle);
    }
  }, [activeMuscle, addTargetedMuscle]);

  return (
    <div className={classes["targeted-muscles"]}>
      {props.muscles.map((muscle, idx) => {
        let activeMuscleClass =
          muscle === activeMuscle || props.muscles.length === 1
            ? targetedMuscleClasses["targeted-muscle--active"]
            : null;

        return (
          <TargetedMuscle
            key={muscle + idx}
            muscle={muscle}
            onClick={() => setActiveMuscle(muscle)}
            activeClassName={activeMuscleClass}
            onChange={props.onChange}
          />
        );
      })}
    </div>
  );
};

export default TargetedMuscles;
