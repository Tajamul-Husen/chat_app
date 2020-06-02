import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(false);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};
