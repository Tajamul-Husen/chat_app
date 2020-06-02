import React, { useContext } from "react";

import MessageBox from "./MessageBox";
import UserMessageBox from "./UserMessageBox";

import { ChatListContext } from "../../contexts/chatListContext";
import { ActiveChatContext } from "../../contexts/activeChatContext";
import { ClientProfileContext } from "../../contexts/clientProfileContext";
import { ScrollToBottomContext } from "../../contexts/scrollToBottomContext";
import "./MessageContainer.scss";

function MessageContainer() {
  const { chatList } = useContext(ChatListContext);
  const { activeChat } = useContext(ActiveChatContext);
  const { clientProfile } = useContext(ClientProfileContext);
  const { messageContainerRef } = useContext(ScrollToBottomContext);

  const data =
    chatList[activeChat] &&
    chatList[activeChat].map((message, i) => {
      if (message.sender === clientProfile.userName) {
        return <UserMessageBox key={i} message={message}></UserMessageBox>;
      } else {
        return <MessageBox key={i} message={message}></MessageBox>;
      }
    });

  return (
    <div ref={messageContainerRef} className="message-container">
      {data}
    </div>
  );
}

export default MessageContainer;
