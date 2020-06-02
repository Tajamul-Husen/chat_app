import React, { useEffect, useContext, useState } from "react";

import { ChatContainer } from "../ChatContainer";
import { HomeChat } from "../HomeChat";
import { UsersContainer } from "../UsersContainer";
import "./Main.scss";
import tone from "../../assets/sound/Popcorn.ogg";

import { ActiveChatContext } from "../../contexts/activeChatContext";
import { DisplayChatWindowContext } from "../../contexts/displayChatWindowContext";
import { ChatListContext } from "../../contexts/chatListContext";
import { UsersListContext } from "../../contexts/usersListContext";
import { SocketContext } from "../../contexts/socketContext";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { ScrollToBottomContext } from "../../contexts/scrollToBottomContext";
import { MobileResponsiveContext } from "../../contexts/mobileResponsiveContext";
import useConnection from "../../hooks/useConnection";
import scrollToBottom from "../../utils/scrollBottom";

function Main() {
  const { socket } = useContext(SocketContext);
  const { dispatchUsers } = useContext(UsersListContext);
  const { dispatchChat } = useContext(ChatListContext);
  const { chatWindow } = useContext(DisplayChatWindowContext);
  const { activeChat } = useContext(ActiveChatContext);
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const { messageContainerRef } = useContext(ScrollToBottomContext);
  const { toggleChat } = useContext(MobileResponsiveContext);
  const [chatObj, setChatObj] = useState({});
  const [online, setOnline] = useState(false);
  const { connection } = useConnection(socket);
  const [sound] = useState(new Audio(tone));

  useEffect(() => {
    socket.on("chat-message", ({ message, receiverObj }) => {
      const messageObj = {
        sender: receiverObj.userName,
        message: message.message,
        date: message.date,
      };

      dispatchUsers({
        type: "ADD_USER",
        payload: receiverObj,
      });

      dispatchUsers({
        type: "LAST_MESSAGE",
        payload: { id: receiverObj.id, msg: message.message },
      });

      dispatchChat({
        type: "ADD_MESSAGE",
        payload: {
          chatId: message.chatId,
          message: messageObj,
        },
      });

      sound.play();

      scrollToBottom(messageContainerRef.current);

      setChatObj({ id: message.chatId, user: receiverObj });
    });

    return () => {
      socket.off();
    };
  }, [socket, dispatchChat]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      dispatchUsers({
        type: "ADD_NOTIFICATION",
        payload: chatObj.user,
      });
    } else {
      if (activeChat !== chatObj.id) {
        dispatchUsers({
          type: "ADD_NOTIFICATION",
          payload: chatObj.user,
        });
      } else return;
    }
  }, [chatObj]);

  useEffect(() => {
    socket.on("user-offline", (id) => {
      dispatchUsers({
        type: "SET_USER_OFFLINE",
        payload: id,
      });

      setOnline(true);
    });
    return () => {
      socket.off();
    };
  }, [socket]);

  useEffect(() => {
    if (online) {
      if (Object.keys(userProfile).length) {
        setUserProfile({ ...userProfile, online: false });
      }
    }
  }, [online]);

  useEffect(() => {
    scrollToBottom(messageContainerRef.current);
  }, [chatObj]);

  return connection ? (
    <div className="connection-lost">Connection lost to the server...</div>
  ) : (
    <div className={toggleChat ? "main-container active" : "main-container"}>
      <UsersContainer></UsersContainer>
      <div className="chat-wrapper">
        {chatWindow ? <ChatContainer></ChatContainer> : <HomeChat></HomeChat>}
      </div>
    </div>
  );
}

export default Main;
