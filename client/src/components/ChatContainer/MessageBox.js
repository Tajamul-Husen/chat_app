import React from "react";

function MessageBox({ message }) {
  return (
    <div className="message-box">
      <div className="icon message-icon">
        <span className="message-icon-letter">{message.sender[0]}</span>
      </div>
      <div className="message-content">
        <p className="message-content-body">{message.message}</p>
        <p className="message-content-date">{message.date}</p>
      </div>
    </div>
  );
}

export default MessageBox;
