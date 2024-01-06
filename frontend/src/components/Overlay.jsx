import React from 'react';
import PropTypes from 'prop-types';

const Overlay = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <button onClick={onClose} aria-label="Close">
      <div className="fixed inset-0 z-40 flex items-center justify-center overflow-auto bg-black bg-opacity-50"></div>
    </button>
  );
};

Overlay.propTypes = {
  show: PropTypes.bool.isRequired, // Whether to show the overlay or not
  onClose: PropTypes.func.isRequired // Function to close/hide the overlay
};

export default Overlay;
