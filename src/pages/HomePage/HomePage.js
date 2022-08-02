import Program from "../../components/Program/Program";
import PageIntro from "../../core-ui/PageIntro/PageIntro";
import classes from "./HomePagae.module.scss";

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

const programData = [
  {
    programName: "Pro Split",
    programImage: programImage1,
    programImageBG: programImgeBackground1,
  },
  {
    programName: "Push Pull Legs",
    programImage: programImage2,
    programImageBG: programImgeBackground2,
  },
  {
    programName: "Upper Lower",
    programImage: programImage3,
    programImageBG: programImgeBackground3,
  },
  {
    programName: "Full Body",
    programImage: programImage4,
    programImageBG: programImgeBackground4,
  },
  {
    programName: "Cardio",
    programImage: programImage5,
    programImageBG: programImgeBackground5,
  },
];

const HomePage = () => {
  return (
    <div>
      <PageIntro subTitle="Select Your" mainTitle="Program" />
      <div className="container">
        <div className={`section`}>
          {programData.map((program, idx) => (
            <Program
              key={program.programName}
              programImageURL={program.programImage}
              programImageBG={program.programImageBG}
              programName={program.programName}
              idx={idx + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
