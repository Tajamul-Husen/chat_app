import React, { createContext, useState } from "react";

export const DisplayChatWindowContext = createContext();

export const DisplayChatWindowContextProvider = (props) => {
  const [chatWindow, setChatWindow] = useState(false);

  return (
    <DisplayChatWindowContext.Provider value={{ chatWindow, setChatWindow }}>
      {props.children}
    </DisplayChatWindowContext.Provider>
  );
};
