import React from 'react';
import './Modal.style.css';

function Modal({ isOpen, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
