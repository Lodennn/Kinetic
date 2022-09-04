import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";

const LoginPage = (props) => {
  const [activeAuthForm, setActiveAuthForm] = useState("login");
  return (
    <>
      {activeAuthForm === "login" && (
        <>
          <h1>Login</h1>
          <LoginForm changeAuthForm={() => setActiveAuthForm("signup")} />
        </>
      )}
      {activeAuthForm === "signup" && (
        <>
          <h1>Signup</h1>
          <SignupForm changeAuthForm={() => setActiveAuthForm("login")} />
        </>
      )}
    </>
  );
};

export default LoginPage;
