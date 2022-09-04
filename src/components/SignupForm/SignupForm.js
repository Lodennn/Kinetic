import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userSignupAction } from "../../store/auth/auth-slice";

const SignupForm = (props) => {
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
      username: "",
      email: 0,
      age: 0,
      password: "",
      repassword: "",
    },
    onSubmit(values) {
      console.log("values: ", values);
      dispatch(userSignupAction(values));
    },
  });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="age"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="repassword"
          placeholder="re-password"
          onChange={handleChange}
        />
        <button type="submit">Signup</button>
      </form>
      <p onClick={props.changeAuthForm}>Already has an account ?</p>
    </div>
  );
};

export default SignupForm;
