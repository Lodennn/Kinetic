import { useEffect, useState } from "react";
import { formatDate, resetDate } from "../../services/dates";
import { yesterday } from "../../services/lookups";
import classes from "./WorkoutsDateSlider.module.scss";

const WorkoutsDateSlider = (props) => {
  const { date: propsDate, dates, getPrevDate, getNextDate } = props;

  const [activeDate, setActiveDate] = useState(propsDate);

  const humanReadableDateFormat = () => {
    if (resetDate(new Date()) === resetDate(activeDate)) return "Today";
    return formatDate(activeDate);
  };

  useEffect(() => {
    setActiveDate(new Date(propsDate));
  }, [propsDate]);

  return (
    <div className={classes["date-slider"]}>
      <div className={classes["date-slider__left-arrow"]} onClick={getPrevDate}>
        {" "}
        {"<"}{" "}
      </div>
      <div>{humanReadableDateFormat()}</div>
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
