import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userSignupAction } from "../../store/auth/auth-slice";

import * as yup from "yup";
import { renderErrorClass, renderErrorMessage } from "../../helpers/form";
import errorsService from "../../services/errors";
import { useState } from "react";

const SignupForm = (props) => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().min(5).required(),
    password: yup.string().required("Password is required"),
    repassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
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
      username: "",
      email: "",
      age: 0,
      password: "",
      repassword: "",
    },
    onSubmit(values) {
      dispatch(userSignupAction(values)).then((data) => {
        setError(data.payload.error.message);
      });
    },
    validationSchema,
  });
  return (
    <div className="auth-form">
      {error && (
        <div className="alert alert--danger">{errorsService[`${error}`]}</div>
      )}
      <form onSubmit={handleSubmit} className="auth-form__form">
        <h1>Signup</h1>
        <div className="">
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            className={`form-control ${renderErrorClass(
              { errors, touched },
              "username"
            )}`}
          />
          <p className="error-message">
            {renderErrorMessage(errors, "username")}
          </p>
        </div>
        <div className="">
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            className={`form-control ${renderErrorClass(
              { errors, touched },
              "email"
            )}`}
          />
          <p className="error-message">{renderErrorMessage(errors, "email")}</p>
        </div>
        <div className="">
          <input
            type="number"
            name="age"
            placeholder="age"
            onChange={handleChange}
            className={`form-control ${renderErrorClass(
              { errors, touched },
              "age"
            )}`}
          />
          <p className="error-message">{renderErrorMessage(errors, "age")}</p>
        </div>
        <div className="">
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            className={`form-control ${renderErrorClass(
              { errors, touched },
              "password"
            )}`}
          />
          <p className="error-message">
            {renderErrorMessage(errors, "password")}
          </p>
        </div>
        <div className="">
          <input
            type="password"
            name="repassword"
            placeholder="re-password"
            onChange={handleChange}
            className={`form-control ${renderErrorClass(
              { errors, touched },
              "repassword"
            )}`}
          />
          <p className="error-message">
            {renderErrorMessage(errors, "repassword")}
          </p>
        </div>
        <button type="submit">Signup</button>
      </form>
      <p onClick={props.changeAuthForm}>Already have an account ?</p>
    </div>
  );
};

export default SignupForm;
