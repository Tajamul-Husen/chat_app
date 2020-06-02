import React from "react";
import "./HomeChat.scss";
import PeopleAlt from "@material-ui/icons/PeopleAlt";

function HomeChat() {
  return (
    <div className="home-chat-container">
        <PeopleAlt className="home-chat-icon"></PeopleAlt>
      <h2 className="home-chat-title">Chat with your friends</h2>
    </div>
  );
}

export default HomeChat;
