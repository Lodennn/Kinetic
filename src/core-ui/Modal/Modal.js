import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.scss";

const Modal = (props) => {
  const BackdropComponent = (props) => {
    return <div className={classes.backdrop} onClick={props.onHide}></div>;
  };

  const ModalComponent = (props) => {
    return <div className={classes.modal}>{props.children}</div>;
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackdropComponent onHide={props.onHide} />,
        document.getElementById("backdrop-overlay")
      )}
      {ReactDOM.createPortal(
        <ModalComponent>{props.children}</ModalComponent>,
        document.getElementById("modal-overlay")
      )}
    </Fragment>
  );
};

export default Modal;
