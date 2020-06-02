import React from "react";

function UserMessageBox({ message }) {
  return (
    <div className="message-box user-message-box">
      <div className="message-content">
        <p className="message-content-body">{message.message}</p>
        <p className="message-content-date">{message.date}</p>
      </div>
    </div>
  );
}

export default UserMessageBox;
