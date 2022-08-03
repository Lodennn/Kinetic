import React from "react";
import classes from "./FloatingCTA.module.scss";

const FloatingCTA = (props) => {
  return (
    <div className={classes["floating-cta"]} onClick={props.onClick}>
      {props.icon}
    </div>
  );
};

export default FloatingCTA;
