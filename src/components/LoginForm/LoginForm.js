const LoginForm = (props) => {
  return (
    <div>
      <form>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
      </form>
      <p onClick={props.changeAuthForm}>Create new account ?</p>
    </div>
  );
};

export default LoginForm;
