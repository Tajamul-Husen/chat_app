import React, { useContext } from "react";

import { ActiveChatContext } from "../../contexts/activeChatContext";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { ClientProfileContext } from "../../contexts/clientProfileContext";
import { DisplayChatWindowContext } from "../../contexts/displayChatWindowContext";
import { UsersListContext } from "../../contexts/usersListContext";
import { MobileResponsiveContext } from "../../contexts/mobileResponsiveContext";
import { ScrollToBottomContext } from "../../contexts/scrollToBottomContext";
import "./UserBox.scss";

import scrollToBottom from "../../utils/scrollBottom";
import createChatId from "../../utils/createChatId";
import activeUser from "../../utils/showActiveUser";

function UserBox({ user }) {
  const { setUserProfile } = useContext(UserProfileContext);
  const { clientProfile } = useContext(ClientProfileContext);
  const { setActiveChat } = useContext(ActiveChatContext);
  const { setChatWindow } = useContext(DisplayChatWindowContext);
  const { dispatchUsers } = useContext(UsersListContext);
  const { setToggleChat } = useContext(MobileResponsiveContext);
  const { messageContainerRef } = useContext(ScrollToBottomContext);

  function createChatSession(e) {
    dispatchUsers({ type: "REMOVE_NOTIFICATION", payload: { id: user.id } });
    const chatId = createChatId(clientProfile.id, user.id, "@");
    setActiveChat(chatId);
    setUserProfile(user);
    setToggleChat(true);
    setChatWindow(true);
    scrollToBottom(messageContainerRef.current);
    activeUser(e.currentTarget, "selected");
  }

  return (
    <div className="user-box" onClick={createChatSession}>
      <div className="user-icon-container">
        <div className="icon user-icon">
          <span className="user-letter">{user.userName[0]}</span>
          {user.online && <span className="user-online"></span>}
        </div>
      </div>
      <div className="user-content-container">
        <div className="user-content">
          <p className="user-content-name">{user.userName}</p>
          <p className="user-content-last-message">
            {user.lastMessage && user.lastMessage}
          </p>
        </div>
        <div className="user-content-info">
          <p className="user-content-info-date"></p>
          <span
            className="icon user-content-info-notifications"
            style={{ visibility: user.unread > 0 ? "visible" : "hidden" }}
          >
            {user.unread}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserBox;
