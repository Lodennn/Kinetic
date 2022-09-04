import React, { Fragment, useRef } from "react";
import classes from "./AddSet.module.scss";

const AddSet = (props) => {
  const { showModalHandler, reps, id, weight, weightUnit, modifier, onChange } =
    props;

  const randomSetCheckboxId = useRef(Math.floor(Math.random() * (100000 + id)));

  return (
    <div
      className={`${classes.sets} ${classes[`sets--${modifier}`]}`}
      onClick={() => {
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
            className="checkbox__sets"
            onChange={onChange && onChange}
          />
          <span>{reps}</span>
          {weight && (
            <div className={classes["sets__weight"]}>{weight + weightUnit}</div>
          )}
        </div>
      </Fragment>
    </div>
  );
};

export default AddSet;
