import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import classes from "./AddSpecialSetModal.module.scss";

const AddSpecialSetModal = (props) => {
  const [activeWeight, setActiveWeight] = useState("kg");

  const { getWeightUnit, setCheckboxId } = props;

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      weight: 0,
      reps: 0,
    },
    onSubmit(values) {
      console.log("AddSpecialSetModal = values: ", values);
      if (values.reps && values.weight) {
        console.log("VALID");
      } else {
        console.log("NOT VALID");
      }
      // alert("values: ", JSON.stringify(values));
    },
  });

  useEffect(() => {
    if (isSubmitting) {
      if (values.reps && values.weight) {
        //prettier-ignore
        const element = document.querySelector(`#set-${setCheckboxId.split("-").at(-1)}`);
        element.checked = true;
      }
    }
  }, [setCheckboxId, isSubmitting, values.reps, values.weight]);

  const toggleActiveWeight = (unit) => {
    setActiveWeight(unit);
    getWeightUnit(unit);
  };

  const onSubmit = (event) => {
    setTimeout(() => {
      props.hideModalHandler();
      props.addSetsHandler();
    });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className={classes.wrapper}>
          <div className={classes["special-set-modal"]}>
            <ul className={classes["weight-transformer"]}>
              <li
                className={`${classes["weight-transformer__item"]} ${
                  activeWeight === "kg"
                    ? classes["weight-transformer__item--active"]
                    : null
                }`}
                onClick={() => toggleActiveWeight("kg")}
              >
                kg
              </li>
              <li
                className={`${classes["weight-transformer__item"]} ${
                  activeWeight === "lbs"
                    ? classes["weight-transformer__item--active"]
                    : null
                }`}
                onClick={() => toggleActiveWeight("lbs")}
              >
                lbs
              </li>
            </ul>
            <div className={`form-group-flex mb-md`}>
              <h6 className="title-5 text-uppercase">Num of reps: </h6>
              <input
                type="number"
                name="reps"
                className="kinetic-input-1-digit kinetic-input"
                defaultValue={0}
                onChange={(event) => {
                  handleChange(event);
                  props.onChangeUserNumberOfReps(event);
                }}
              />
            </div>
            <div className={`form-group-flex`}>
              <h6 className="title-5 text-uppercase">Weight: </h6>
              <input
                type="number"
                name="weight"
                className="kinetic-input-1-digit kinetic-input"
                defaultValue={0}
                onChange={(event) => {
                  handleChange(event);
                  props.onChangeUserNumberOfWeight(event);
                }}
              />
            </div>
            <button
              className={`btn btn--primary ${classes["special-set-modal__confirm"]}`}
              type="submit"
              onClick={onSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default React.memo(AddSpecialSetModal);
