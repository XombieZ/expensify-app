import React from "react";

const ConfirmationModal = props => {
  return (
    <div className="modal-confirmation">
      <h3>{props.message}</h3>
      <div className="modal-confirmation-inputs">
        <button className="button" onClick={props.onConfirm}>
          Ok
        </button>
        <button className="button button--secondary" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
