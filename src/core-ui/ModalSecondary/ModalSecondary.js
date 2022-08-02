import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./ModalSecondary.module.scss";

const ModalSecondary = (props) => {
  const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onHide}></div>;
  };
  const Modal = (props) => {
    return <div className={classes.modal}>{props.children}</div>;
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHide={props.onHide} />,
        document.getElementById("backdrop-overlay-secondary")
      )}
      {ReactDOM.createPortal(
        <Modal>{props.children}</Modal>,
        document.getElementById("modal-overlay-secondary")
      )}
    </Fragment>
  );
};

export default ModalSecondary;
