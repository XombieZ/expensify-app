import React from "react";

class ModalWrapper extends React.Component {
  render() {
    return (
      <div
        className={
          !this.props.isHidden
            ? "modal-wrapper modal-wrapper--visible"
            : "modal-wrapper modal-wrapper--hidden"
        }
      >
        <div className="modal-wrapper-content">{this.props.children}</div>
      </div>
    );
  }
}

export default ModalWrapper;
