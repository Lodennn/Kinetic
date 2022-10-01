import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignupForm from "../../components/SignupForm/SignupForm";

import "./AuthPage.scss";

const LoginPage = (props) => {
  const [activeAuthForm, setActiveAuthForm] = useState("login");
  return (
    <div className="auth-page">
      <div className="auth-page--overlay">
        {activeAuthForm === "login" && (
          <>
            <LoginForm changeAuthForm={() => setActiveAuthForm("signup")} />
          </>
        )}
        {activeAuthForm === "signup" && (
          <>
            <SignupForm changeAuthForm={() => setActiveAuthForm("login")} />
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
