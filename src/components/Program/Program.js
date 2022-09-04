import { Link } from "react-router-dom";
import classes from "./Program.module.scss";

const Program = (props) => {
  return (
    <Link to={`/program/${props.id}`}>
      <div className={classes.program}>
        <div
          className={classes["program--wrapper"]}
          // style={{ backgroundImage: `url(${props.programImage})` }}
        >
          {/* <div
            className={`${classes["program__floating-img"]} ${
              classes[`program__floating-img--${props.idx}`]
            }`}
          >
            <img
              src={props.programImageURL}
              alt="Program Img"
              className={`${classes["program__img"]} img-fluid`}
            />
          </div> */}
          <div className={classes["program__textcontainer"]}>
            <h4 className={classes["program__name"]}>
              {props.programName.split(" ").map((text) => (
                <span key={text}>{text}</span>
              ))}
            </h4>
            <span className={classes["program__sub-title"]}>Program</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Program;
