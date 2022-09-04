import { Fragment } from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";

const Modal = (props) => {
  const BackdropComponent = (props) => {
    return <div className={"backdrop"} onClick={props.onHide}></div>;
  };

  const ModalComponent = (props) => {
    return (
      <div className={`modal ${`modal--${props.modalToUse}`}`}>
        {props.children}
      </div>
    );
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackdropComponent onHide={props.onHide} />,
        document.getElementById("backdrop-overlay")
      )}
      {ReactDOM.createPortal(
        <ModalComponent modalToUse={props.modalToUse}>
          {props.children}
        </ModalComponent>,
        document.getElementById("modal-overlay")
      )}
    </Fragment>
  );
};

export default Modal;
