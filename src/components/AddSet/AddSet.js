import React, { Fragment, useRef } from "react";
import classes from "./AddSet.module.scss";

const AddSet = (props) => {
  const {
    showModalHandler,
    reps,
    id,
    weight,
    weightUnit,
    modifier,
    onChange,
    disabled,
  } = props;

  const randomSetCheckboxId = useRef(Math.floor(Math.random() * (100000 + id)));

  return (
    <div
      className={`${classes.sets} ${classes[`sets--${modifier}`]}`}
      style={{ opacity: disabled ? ".5" : "1" }}
      onClick={() => {
        !disabled &&
          showModalHandler &&
          showModalHandler({
            setId: id,
            setCheckboxId: `set-checkbox-${randomSetCheckboxId.current}`,
          });
      }}
    >
      <Fragment>
        <div className={classes["sets__set"]}>
          <input
            type="checkbox"
            id={`set-${randomSetCheckboxId.current}`}
            name={`set-checkbox-${randomSetCheckboxId.current}`}
            value={`set-checkbox`}
            className="checkbox__sets set-checkbox"
            onChange={onChange || onChange}
          />
          <span>{reps && parseInt(reps, 10)}</span>
          {weight && (
            <div className={classes["sets__weight"]}>
              {parseInt(weight, 10) + weightUnit}
            </div>
          )}
        </div>
      </Fragment>
    </div>
  );
};

export default AddSet;
