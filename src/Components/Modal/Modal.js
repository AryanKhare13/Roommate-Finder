import React from "react";
import "./Modal.css";

const Modal = ({ children }) => {
  return (
    <>
      <section className="modal">
        <div className="modal__Content">{children}</div>
      </section>
    </>
  );
};

export default Modal;
