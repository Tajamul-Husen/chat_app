import React, { createContext, useReducer } from "react";
import { chatListReducer } from "../reducers/chatListReducers";

export const ChatListContext = createContext();

export const ChatListContextProvider = (props) => {
  const [chatList, dispatchChat] = useReducer(chatListReducer, {});

  return (
    <ChatListContext.Provider
      value={{
        chatList,
        dispatchChat,
      }}
    >
      {props.children}
    </ChatListContext.Provider>
  );
};
