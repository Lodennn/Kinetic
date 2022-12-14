import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Day from "../../components/Day/Day";
import Navigation from "../../components/Layouts/Navigation/Navigation";
import LoadingSpinner from "../../core-ui/LoadingSpinner/LoadingSpinner";
import PageIntro from "../../core-ui/PageIntro/PageIntro";
import { getDaysAction } from "../../store/days/days-slice";

const ProgramDaysPage = () => {
  const dispatch = useDispatch();
  const { data: daysData, isLoading } = useSelector((state) => state.days);

  const params = useParams();

  useEffect(() => {
    dispatch(getDaysAction(params.programId));
  }, [dispatch, params.programId]);

  return (
    <>
      <Navigation />
      <div>
        <PageIntro subTitle="Program" mainTitle="Days" />
        <div className="container section">
          {isLoading && <LoadingSpinner />}
          {!isLoading &&
            daysData.length !== 0 &&
            daysData.map((day) => {
              return <Day key={day.id} dayName={day.dayName} id={day.id} />;
            })}
        </div>
      </div>
    </>
  );
};

export default ProgramDaysPage;
