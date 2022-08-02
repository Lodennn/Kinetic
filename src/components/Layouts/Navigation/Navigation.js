import { Link } from "react-router-dom";
import classes from "./Navigation.module.scss";

const Navigation = () => {
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
            <li className={classes["navigation__auth-item"]}>
              <Link to="/">Sign up</Link>
            </li>
            <li className={classes["navigation__auth-item"]}>
              <Link to="/">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
