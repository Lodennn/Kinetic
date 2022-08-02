import classes from "./PageIntro.module.scss";

const PageIntro = (props) => {
  return (
    <div className={classes["page-intro"]}>
      <div className="container">
        <p className={classes["page-intro__sub"]}>{props.subTitle}</p>
        <h2 className={classes["page-intro__main"]}>{props.mainTitle}</h2>
      </div>
    </div>
  );
};

export default PageIntro;
