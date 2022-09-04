import { useEffect, useState } from "react";
import { formatDate, resetDate } from "../../services/dates";
import classes from "./WorkoutsDateSlider.module.scss";

const WorkoutsDateSlider = (props) => {
  const { date: propsDate, dates, getPrevDate, getNextDate } = props;

  const [activeDate, setActiveDate] = useState(propsDate);

  useEffect(() => {
    // let newActiveDate = dates.find(
    //   (date) => resetDate(new Date(propsDate)) === resetDate(new Date(date))
    // );

    setActiveDate(new Date(propsDate));
  }, [propsDate]);

  return (
    <div className={classes["date-slider"]}>
      <div className={classes["date-slider__left-arrow"]} onClick={getPrevDate}>
        {" "}
        {"<"}{" "}
      </div>
      <div>{formatDate(activeDate)}</div>
      <div
        className={classes["date-slider__right-arrow"]}
        onClick={getNextDate}
      >
        {" "}
        {">"}{" "}
      </div>
    </div>
  );
};

export default WorkoutsDateSlider;
