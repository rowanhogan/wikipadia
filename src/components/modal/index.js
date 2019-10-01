import React, { Component } from "react";
import { createPortal } from "react-dom";
import withClickOutside from "react-click-outside";

class Modal extends Component {
  constructor() {
    super();
    this.el = null;
  }

  componentDidMount() {
    this.el = document.createElement("div");
    document.querySelector(".settings-wrapper").appendChild(this.el);
  }

  componentWillUnmount() {
    if (this.el) {
      this.el.remove();
    }
  }

  handleClickOutside(event) {
    const { closeOnOutsideClick, handleClose } = this.props;

    if (closeOnOutsideClick) {
      event.preventDefault();
      return handleClose();
    }
  }

  render() {
    const { children, handleClose, isOpen, title } = this.props;

    if (!isOpen) return null;

    return createPortal(
      <div className="modal">
        {title && <h3 className="modal-title">{title}</h3>}
        {children}
        <button className="close" onClick={handleClose}>
          Close
        </button>
      </div>,
      this.el
    );
  }
}

Modal.defaultProps = {
  closeOnOutsideClick: true,
  isOpen: false
};

export default withClickOutside(Modal);
