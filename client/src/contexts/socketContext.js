import React, { createContext, useState } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState(null);
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {props.children}
    </SocketContext.Provider>
  );
};
