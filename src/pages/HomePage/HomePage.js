import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Program from "../../components/Program/Program";
import PageIntro from "../../core-ui/PageIntro/PageIntro";

import { getProgramsAction } from "../../store/programs/programs-slice";

import programImage1 from "./../../assets/images/program-image-1.png";
import programImgeBackground1 from "./../../assets/images/program-bg-1.png";
import programImage2 from "./../../assets/images/program-image-2.png";
import programImgeBackground2 from "./../../assets/images/program-bg-2.png";
import programImage3 from "./../../assets/images/program-image-3.png";
import programImgeBackground3 from "./../../assets/images/program-bg-3.png";
import programImage4 from "./../../assets/images/program-image-4.png";
import programImgeBackground4 from "./../../assets/images/program-bg-4.png";
import programImage5 from "./../../assets/images/program-image-5.png";
import programImgeBackground5 from "./../../assets/images/program-bg-5.png";

import classes from "./HomePagae.module.scss";
import LoadingSpinner from "../../core-ui/LoadingSpinner/LoadingSpinner";
import Navigation from "../../components/Layouts/Navigation/Navigation";

// const programData = [
//   {
//     programName: "Pro Split",
//     programImage: programImage1,
//     programImageBG: programImgeBackground1,
//   },
//   {
//     programName: "Push Pull Legs",
//     programImage: programImage2,
//     programImageBG: programImgeBackground2,
//   },
//   {
//     programName: "Upper Lower",
//     programImage: programImage3,
//     programImageBG: programImgeBackground3,
//   },
//   {
//     programName: "Full Body",
//     programImage: programImage4,
//     programImageBG: programImgeBackground4,
//   },
//   {
//     programName: "Cardio",
//     programImage: programImage5,
//     programImageBG: programImgeBackground5,
//   },
// ];

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: programsData, isLoading } = useSelector(
    (state) => state.programs
  );

  useEffect(() => {
    dispatch(getProgramsAction());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <div>
        <PageIntro subTitle="Select Your" mainTitle="Program" />
        <div className="container">
          <div className={`section`}>
            {isLoading && <LoadingSpinner />}
            {!isLoading &&
              programsData?.length !== 0 &&
              programsData.map((program, idx) => (
                <Program
                  key={program.id}
                  id={program.id}
                  programName={program.programName}
                  // programImage={program.programImage}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
