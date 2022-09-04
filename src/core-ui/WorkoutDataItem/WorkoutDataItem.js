import classes from "./WorkoutDataItem.module.scss";

const WorkoutDataItem = (props) => {
  let dataType = props.type === "weight" ? "WL" : "REPS";

  return (
    <div className={classes["workout-data-item"]}>
      <div className={classes["workout-data-item__type"]}>{dataType}</div>
      <div className={classes["workout-data-item__data"]}>
        {props.data ? props.data : 0}
      </div>
    </div>
  );
};

export default WorkoutDataItem;
