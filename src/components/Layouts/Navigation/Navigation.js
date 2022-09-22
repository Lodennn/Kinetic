import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../../../store/auth/auth-slice";
import classes from "./Navigation.module.scss";

const Navigation = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLogoutAction());
  };

  return (
    <nav className={classes.navigation}>
      <div className="container">
        <div className={`${classes["navigation__wrapper"]} flex-wrapper`}>
          <ul className={classes["navigation__links"]}>
            <li className={classes["navigation__item"]}>
              <Link to="" className={classes["navigation__link"]}>
                Home
              </Link>
            </li>
            <li className={classes["navigation__item"]}>
              <Link to="" className={classes["navigation__link"]}>
                Muscle
              </Link>
            </li>
            <li className={classes["navigation__item"]}>
              <Link to="" className={classes["navigation__link"]}>
                Workouts
              </Link>
            </li>
          </ul>
          <ul className={classes["navigation__auth"]}>
            {!isLoggedIn && (
              <>
                <li className={classes["navigation__auth-item"]}>
                  <Link to="/">Sign up</Link>
                </li>
                <li className={classes["navigation__auth-item"]}>
                  <Link to="/">Login</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className={classes["navigation__auth-item"]} onClick={logout}>
                <Link to="/auth">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
