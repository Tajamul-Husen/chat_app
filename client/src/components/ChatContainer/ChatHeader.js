import React, { useContext, useEffect, useState } from "react";

import ArrowBack from "@material-ui/icons/ArrowBack";

import { SocketContext } from "../../contexts/socketContext";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { MobileResponsiveContext } from "../../contexts/mobileResponsiveContext";

import "./ChatHeader.scss";

function ChatHeader() {
  const { userProfile } = useContext(UserProfileContext);
  const { socket } = useContext(SocketContext);
  const { setToggleChat } = useContext(MobileResponsiveContext);
  const [userTyping, setUserTyping] = useState(false);

  useEffect(() => {
    socket.on("user-messaging", (data) => {
      if (data.typing) setUserTyping(true);
      else setUserTyping(false);
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  const handleChat = () => {
    setToggleChat(false);
  };

  return (
    <div className="chat-header">
      <ArrowBack
        className="chat-header-toggle"
        onClick={handleChat}
      ></ArrowBack>
      <div className="icon chat-header-icon">
        <span className="chat-header-icon-letter">
          {userProfile.userName[0]}
        </span>
      </div>
      <div className="chat-header-content">
        <p className="chat-header-content-name">{userProfile.userName}</p>
        <p className="chat-header-content-status">
          {userTyping ? "typing..." : userProfile.online ? "online" : "offline"}
        </p>
      </div>
    </div>
  );
}

export default ChatHeader;
