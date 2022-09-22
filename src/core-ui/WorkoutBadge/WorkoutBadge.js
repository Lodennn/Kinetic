import { ReactComponent as UpBadge } from "../../assets/icons/Enhancement.svg";
import { ReactComponent as DownBadge } from "../../assets/icons/DIMINUTION.svg";
import { ReactComponent as SuperSetBadge } from "../../assets/icons/SUPERSET.svg";
import { ReactComponent as DropSetBadge } from "../../assets/icons/DROPSET.svg";
import classes from "./WorkoutBadge.module.scss";

const WorkoutBadge = (props) => {
  let RenderedBadge = null;
  let isRenderAllowed = true;

  switch (props.type) {
    case "up":
      RenderedBadge = UpBadge;
      break;
    case "down":
      RenderedBadge = DownBadge;
      break;
    case "super":
      RenderedBadge = SuperSetBadge;
      break;
    case "drop":
      RenderedBadge = DropSetBadge;
      break;
    case "fixed":
      RenderedBadge = SuperSetBadge;
      break;
    default:
      RenderedBadge = null;
      isRenderAllowed = false;
  }

  return (
    isRenderAllowed && (
      <RenderedBadge
        className={`${classes.badge} ${classes[`badge--${props.type}`]} ${
          classes[`badge--${props.size}`]
        } ${classes[`badge--${props.color}`]}`}
      />
    )
  );
};

export default WorkoutBadge;
