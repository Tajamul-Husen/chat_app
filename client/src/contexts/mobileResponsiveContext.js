import React, { createContext, useState } from "react";

export const MobileResponsiveContext = createContext();

export const MobileResponsiveContextProvider = (props) => {
  const [toggleChat, setToggleChat] = useState(false);

  return (
    <MobileResponsiveContext.Provider value={{ toggleChat, setToggleChat }}>
      {props.children}
    </MobileResponsiveContext.Provider>
  );
};
