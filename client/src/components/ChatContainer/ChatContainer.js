import React from "react";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import ReplyContainer from "./ReplyContainer";
import "./ChatContainer.scss";

function ChatContainer() {
  return (
      <div className="chat-container">
        <ChatHeader></ChatHeader>
        <MessageContainer></MessageContainer>
        <ReplyContainer></ReplyContainer>
      </div>
  );
}

export default ChatContainer;
