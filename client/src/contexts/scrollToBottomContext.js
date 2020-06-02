import React, { createContext, useRef } from "react";

export const ScrollToBottomContext = createContext();

export const ScrollToBottomContextProvider = (props) => {
  const messageContainerRef = useRef(null);

  return (
    <ScrollToBottomContext.Provider
      value={{ messageContainerRef }}
    >
      {props.children}
    </ScrollToBottomContext.Provider>
  );
};
