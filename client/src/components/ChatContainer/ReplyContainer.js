import React, { useState, useContext, useEffect, lazy, Suspense } from "react";

import Send from "@material-ui/icons/Send";
import EmojiEmotions from "@material-ui/icons/EmojiEmotions";
import tone from "../../assets/sound/Popcorn.ogg";

import { ClientProfileContext } from "../../contexts/clientProfileContext";
import { UserProfileContext } from "../../contexts/userProfileContext";
import { ActiveChatContext } from "../../contexts/activeChatContext";
import { ChatListContext } from "../../contexts/chatListContext";
import { UsersListContext } from "../../contexts/usersListContext";
import { SocketContext } from "../../contexts/socketContext";
import { ScrollToBottomContext } from "../../contexts/scrollToBottomContext";
import scrollToBottom from "../../utils/scrollBottom";
import getCurrentTime from "../../utils/getcurrentTime";
import { messageValidate } from "../../utils/validations";

import "./ReplyContainer.scss";

const EmojiLazy = lazy(() => import("./EmojiContainer"));

function ReplyContainer() {
  const { socket } = useContext(SocketContext);
  const { clientProfile } = useContext(ClientProfileContext);
  const { userProfile } = useContext(UserProfileContext);
  const { activeChat } = useContext(ActiveChatContext);
  const { dispatchChat } = useContext(ChatListContext);
  const { dispatchUsers } = useContext(UsersListContext);
  const { messageContainerRef } = useContext(ScrollToBottomContext);
  const [msg, setMsg] = useState("");
  const [scrollBottom, setScrollBottom] = useState(false);
  const [emojiPanel, setEmojiPanel] = useState(false);
  const [sound] = useState(new Audio(tone));

  useEffect(() => {
    scrollToBottom(messageContainerRef.current);
  }, [scrollBottom]);

  const sendMessage = () => {
    if (!messageValidate(msg)) {
      return;
    }

    const date = getCurrentTime();

    socket.emit("send-message", {
      chatId: activeChat,
      from: clientProfile.id,
      to: userProfile.id,
      message: msg,
      date,
    });

    const messageObj = {
      sender: clientProfile.userName,
      message: msg,
      date,
    };

    dispatchChat({
      type: "ADD_MESSAGE",
      payload: { chatId: activeChat, message: messageObj },
    });

    sound.play();

    setScrollBottom(!scrollBottom);

    dispatchUsers({
      type: "ADD_USER",
      payload: userProfile,
    });

    dispatchUsers({
      type: "LAST_MESSAGE",
      payload: { id: userProfile.id, msg },
    });

    setEmojiPanel(false);
    setMsg("");
  };

  const userTyping = (e) => {
    let isUserTyping = false;
    if (e.type === "focus") {
      isUserTyping = true;
    }
    socket.emit("user-typing", { id: userProfile.id, typing: isUserTyping });
  };

  const showEmojiPanel = () => {
    setEmojiPanel(!emojiPanel);
  };

  const addEmojiToMessage = (emoji) => {
    if (emoji.native === "🥰") return;
    setMsg(msg + emoji.native);
  };

  return (
    <div className="reply-container">
      <div className="reply-form">
        <input
          type="text"
          id="send-reply"
          className="reply-form-input"
          placeholder="Type your message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          onFocus={userTyping}
          onBlur={userTyping}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
        />

        <EmojiEmotions
          className="emoji-icon"
          onClick={showEmojiPanel}
        ></EmojiEmotions>

        <Send className="btn-icon" onClick={sendMessage}></Send>
      </div>

      <Suspense fallback={<span></span>}>
        <EmojiLazy
          showNative={false}
          styles={{
            position: "absolute",
            bottom: "62px",
            right: "55px",
            display: emojiPanel ? "block" : "none",
          }}
          onselect={(emoji) => addEmojiToMessage(emoji)}
        ></EmojiLazy>
      </Suspense>
    </div>
  );
}

export default ReplyContainer;
