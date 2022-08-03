import React, { Fragment } from "react";
import classes from "./AddSet.module.scss";

const AddSet = (props) => {
  return (
    <div
      className={`${classes.sets} ${classes[`sets--${props.modifier}`]}`}
      onClick={() => {
        props.showModalHandler(props.id);
      }}
    >
      <Fragment>
        <div className={classes["sets__set"]}>
          <span>{props.reps}</span>
          {props.weight && (
            <div className={classes["sets__weight"]}>{props.weight + "kg"}</div>
          )}
        </div>
      </Fragment>
    </div>
  );
};

export default AddSet;
