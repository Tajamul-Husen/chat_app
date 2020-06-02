import React, { createContext, useState } from "react";

export const ActiveChatContext = createContext();

export const ActiveChatContextProvider = (props) => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <ActiveChatContext.Provider value={{ activeChat, setActiveChat }}>
      {props.children}
    </ActiveChatContext.Provider>
  );
};
