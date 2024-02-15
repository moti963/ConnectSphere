import React, { useState, useEffect } from 'react';

const AlertMessage = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  let alertClass = '';

  switch (type) {
    case 'primary':
      alertClass = 'alert-primary';
      break;
    case 'secondary':
      alertClass = 'alert-secondary';
      break;
    case 'success':
      alertClass = 'alert-success';
      break;
    case 'warning':
      alertClass = 'alert-warning';
      break;
    case 'error':
      alertClass = 'alert-danger';
      break;
    default:
      alertClass = 'alert-info';
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Trigger onClose after timeout
    }, 9000); // 9 seconds timeout

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [onClose]);

  return (
    <div className={`alert ${alertClass} alert-dismissible fade show ${isVisible ? 'd-block' : 'd-none'}`} role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default AlertMessage;
