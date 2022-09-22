import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userLoginAction } from "../../store/auth/auth-slice";

const LoginForm = (props) => {
  const dispatch = useDispatch();

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
      console.log("values: ", values);
      dispatch(userLoginAction(values));
    },
  });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p onClick={props.changeAuthForm}>Create new account ?</p>
    </div>
  );
};

export default LoginForm;
