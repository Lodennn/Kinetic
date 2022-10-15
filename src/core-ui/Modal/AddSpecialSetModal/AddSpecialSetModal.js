import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import classes from "./AddSpecialSetModal.module.scss";
import * as Yup from "yup";
import serviceError from "../../../services/errors";
import { renderErrorClass, renderErrorMessage } from "../../../helpers/form";

const AddSpecialSetModal = (props) => {
  let timer;
  const [activeWeight, setActiveWeight] = useState("kg");

  const { getWeightUnit, setCheckboxId } = props;

  const validationSchema = Yup.object().shape({
    weight: Yup.number().positive().min(1).required(serviceError.positive),
    reps: Yup.number().positive().min(1).required(serviceError.positive),
  });

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
      if (values.reps && values.weight) {
        timer = setTimeout(() => {
          props.hideModalHandler();
          props.addSetsHandler();
        });
      } else {
        console.log("NOT VALID");
      }
    },
    validationSchema,
  });

  useEffect(() => {
    if (isSubmitting) {
      if (values.reps && values.weight) {
        //prettier-ignore
        const element = document.querySelector(`#set-${setCheckboxId.split("-").at(-1)}`);
        element.checked = true;
        element.dataset.valid = true;
      }
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [setCheckboxId, isSubmitting]);

  const toggleActiveWeight = (unit) => {
    setActiveWeight(unit);
    getWeightUnit(unit);
  };

  // const onSubmit = (event) => {
  //   timer = setTimeout(() => {
  //     props.hideModalHandler();
  //     props.addSetsHandler();
  //   });
  // };

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
            <div className={`form-group-flex mb-md mt-md`}>
              <h6 className="title-5 text-uppercase">Num of reps: </h6>
              <input
                type="number"
                step="any"
                name="reps"
                className={`kinetic-input-1-digit kinetic-input ${renderErrorClass(
                  { errors, touched },
                  "reps"
                )}`}
                min={1}
                // defaultValue={0}
                placeholder={0}
                onChange={(event) => {
                  handleChange(event);
                  props.onChangeUserNumberOfReps(event);
                }}
              />
            </div>
            <p className="error-message">
              {renderErrorMessage(errors, "reps")}
            </p>
            <div className={`form-group-flex`}>
              <h6 className="title-5 text-uppercase">Weight: </h6>
              <input
                type="number"
                step="any"
                name="weight"
                className={`kinetic-input-1-digit kinetic-input ${renderErrorClass(
                  { errors, touched },
                  "weight"
                )}`}
                // defaultValue={0}
                placeholder={0}
                min={1}
                onChange={(event) => {
                  handleChange(event);
                  props.onChangeUserNumberOfWeight(event);
                }}
              />
            </div>
            <p className="error-message">
              {renderErrorMessage(errors, "weight")}
            </p>
            <div className="flex-cta-wrapper justify-end mt-sm">
              <SecondaryButton
                onClick={props.onHide}
                type="button"
                variant="danger"
              >
                Cancel
              </SecondaryButton>
              <SecondaryButton type="submit" variant="primary">
                Ok
              </SecondaryButton>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default React.memo(AddSpecialSetModal);
