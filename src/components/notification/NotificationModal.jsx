import React from "react";
import "./NotificationModal.css";

const NotificationModal = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="notification-modal">
      <div className="notification-content">
        <p>{message}</p>
        <div className="notification-actions">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
