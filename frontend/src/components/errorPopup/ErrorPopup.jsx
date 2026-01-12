import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './errorPopup.css';

export default function ErrorPopup({ message, onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className='error-popup-top'>
      <p>{message}</p>
    </div>
  );
}

ErrorPopup.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
