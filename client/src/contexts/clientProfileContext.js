import React, { createContext, useState } from "react";

export const ClientProfileContext = createContext();

export const ClientProfileContextProvider = (props) => {
  const [clientProfile, setClientProfile] = useState(null);
  return (
    <ClientProfileContext.Provider value={{ clientProfile, setClientProfile }}>
      {props.children}
    </ClientProfileContext.Provider>
  );
};
