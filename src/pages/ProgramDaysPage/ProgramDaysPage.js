import { useParams } from "react-router-dom";
import Day from "../../components/Day/Day";
import PageIntro from "../../core-ui/PageIntro/PageIntro";

const ProgramDaysPage = () => {
  const params = useParams();
  return (
    <div>
      <PageIntro subTitle="Program" mainTitle="Days" />
      <div className="container section">
        <Day dayName="Push" id="1" programId={params.programId} />
        <Day dayName="Pull" id="2" programId={params.programId} />
        <Day dayName="Legs" id="3" programId={params.programId} />
      </div>
    </div>
  );
};

export default ProgramDaysPage;
