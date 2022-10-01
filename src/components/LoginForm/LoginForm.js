import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userLoginAction } from "../../store/auth/auth-slice";

import * as yup from "yup";

import errorsService from "../../services/errors";
import { renderErrorClass, renderErrorMessage } from "../../helpers/form";

import "../../pages/AuthPage/AuthPage.scss";
import { useState } from "react";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
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
      email: "",
      password: "",
    },
    onSubmit(values) {
      dispatch(userLoginAction(values)).then((data) => {
        setError(data.payload.error.message);
      });
    },
    validationSchema,
  });

  return (
    <div className="auth-form">
      {error && (
        <div className="alert alert--danger">
          {errorsService[`${error}`] || error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="auth-form__form">
        <h1>Login</h1>
        <div className="">
          <input
            type="text"
            name="email"
            placeholder="E-mail address"
            className={`form-control ${renderErrorClass(
              { errors, touched },
              "email"
            )} `}
            onChange={handleChange}
          />{" "}
          <p className="error-message">{renderErrorMessage(errors, "email")}</p>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={`form-control ${renderErrorClass(
              { errors, touched },
              "password"
            )} `}
            onChange={handleChange}
          />{" "}
          <p className="error-message">
            {renderErrorMessage(errors, "password")}
          </p>
        </div>
        <button type="submit">Login</button>
      </form>
      <p onClick={props.changeAuthForm}>Create new account ?</p>
    </div>
  );
};

export default LoginForm;
